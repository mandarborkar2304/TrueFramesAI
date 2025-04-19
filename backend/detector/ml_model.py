import tensorflow as tf
import numpy as np
from PIL import Image
import io
import os
from tqdm import tqdm
from sklearn.model_selection import train_test_split
import matplotlib.pyplot as plt

class ForgeryDetector:
    def __init__(self):
        self.model = self._build_model()
        self.image_size = (224, 224)
        self.batch_size = 32
        
    def _build_model(self):
        """Build a more sophisticated CNN model for forgery detection"""
        base_model = tf.keras.applications.ResNet50V2(
            include_top=False,
            weights='imagenet',
            input_shape=(224, 224, 3)
        )
        
        # Freeze the base model
        base_model.trainable = False
        
        model = tf.keras.Sequential([
            base_model,
            tf.keras.layers.GlobalAveragePooling2D(),
            tf.keras.layers.Dropout(0.5),
            tf.keras.layers.Dense(256, activation='relu'),
            tf.keras.layers.Dropout(0.3),
            tf.keras.layers.Dense(1, activation='sigmoid')
        ])
        
        model.compile(
            optimizer=tf.keras.optimizers.Adam(learning_rate=0.001),
            loss='binary_crossentropy',
            metrics=['accuracy', tf.keras.metrics.AUC()]
        )
        
        return model
    
    def preprocess_image(self, image_path):
        """Preprocess a single image for the model"""
        try:
            image = tf.keras.preprocessing.image.load_img(
                image_path,
                target_size=self.image_size
            )
            image_array = tf.keras.preprocessing.image.img_to_array(image)
            image_array = tf.keras.applications.resnet_v2.preprocess_input(image_array)
            return image_array
        except Exception as e:
            print(f"Error processing image {image_path}: {str(e)}")
            return None

    def create_dataset(self, authentic_dir, tampered_dir):
        """Create training and validation datasets from directories"""
        authentic_images = []
        tampered_images = []
        labels = []

        # Process authentic images
        print("Processing authentic images...")
        for img_name in tqdm(os.listdir(authentic_dir)):
            img_path = os.path.join(authentic_dir, img_name)
            img_array = self.preprocess_image(img_path)
            if img_array is not None:
                authentic_images.append(img_array)
                labels.append(0)  # 0 for authentic

        # Process tampered images
        print("Processing tampered images...")
        for img_name in tqdm(os.listdir(tampered_dir)):
            img_path = os.path.join(tampered_dir, img_name)
            img_array = self.preprocess_image(img_path)
            if img_array is not None:
                tampered_images.append(img_array)
                labels.append(1)  # 1 for tampered

        # Convert to numpy arrays
        X = np.array(authentic_images + tampered_images)
        y = np.array(labels)

        # Split the dataset
        X_train, X_val, y_train, y_val = train_test_split(
            X, y, test_size=0.2, random_state=42, stratify=y
        )

        return (X_train, y_train), (X_val, y_val)

    def train(self, authentic_dir, tampered_dir, epochs=10):
        """Train the model on CASIA dataset"""
        print("Creating dataset...")
        (X_train, y_train), (X_val, y_val) = self.create_dataset(authentic_dir, tampered_dir)
        
        print("Training model...")
        # Data augmentation
        data_augmentation = tf.keras.Sequential([
            tf.keras.layers.RandomFlip("horizontal"),
            tf.keras.layers.RandomRotation(0.1),
            tf.keras.layers.RandomZoom(0.1),
        ])
        
        # Create tf.data.Dataset
        train_dataset = tf.data.Dataset.from_tensor_slices((X_train, y_train))
        train_dataset = train_dataset.shuffle(1000).batch(self.batch_size)
        train_dataset = train_dataset.map(
            lambda x, y: (data_augmentation(x, training=True), y),
            num_parallel_calls=tf.data.AUTOTUNE
        )
        
        val_dataset = tf.data.Dataset.from_tensor_slices((X_val, y_val)).batch(self.batch_size)
        
        # Callbacks
        early_stopping = tf.keras.callbacks.EarlyStopping(
            monitor='val_accuracy',
            patience=3,
            restore_best_weights=True
        )
        
        # Train the model
        history = self.model.fit(
            train_dataset,
            validation_data=val_dataset,
            epochs=epochs,
            callbacks=[early_stopping]
        )
        
        # Save the trained model
        self.model.save('detector/trained_model.h5')
        
        # Plot training history
        self._plot_training_history(history)
        
        return history
    
    def _plot_training_history(self, history):
        """Plot and save training history"""
        plt.figure(figsize=(12, 4))
        
        # Plot accuracy
        plt.subplot(1, 2, 1)
        plt.plot(history.history['accuracy'], label='Training Accuracy')
        plt.plot(history.history['val_accuracy'], label='Validation Accuracy')
        plt.title('Model Accuracy')
        plt.xlabel('Epoch')
        plt.ylabel('Accuracy')
        plt.legend()
        
        # Plot loss
        plt.subplot(1, 2, 2)
        plt.plot(history.history['loss'], label='Training Loss')
        plt.plot(history.history['val_loss'], label='Validation Loss')
        plt.title('Model Loss')
        plt.xlabel('Epoch')
        plt.ylabel('Loss')
        plt.legend()
        
        plt.tight_layout()
        plt.savefig('detector/training_history.png')
        plt.close()
    
    def perform_ela(self, image):
        """Perform Error Level Analysis on the image"""
        # Save image with a specific quality level
        temp_output = io.BytesIO()
        image.save(temp_output, 'JPEG', quality=90)
        temp_output.seek(0)
        image_90 = Image.open(temp_output)
        
        # Save image with a different quality level
        temp_output = io.BytesIO()
        image.save(temp_output, 'JPEG', quality=95)
        temp_output.seek(0)
        image_95 = Image.open(temp_output)
        
        # Calculate the difference
        ela_image = Image.new('RGB', image.size, (0, 0, 0))
        for x in range(image.size[0]):
            for y in range(image.size[1]):
                pixel_90 = image_90.getpixel((x, y))
                pixel_95 = image_95.getpixel((x, y))
                diff = tuple(abs(p90 - p95) * 10 for p90, p95 in zip(pixel_90, pixel_95))
                ela_image.putpixel((x, y), diff)
        
        return ela_image
    
    def analyze_image(self, image_data):
        """Analyze image for potential forgery"""
        # Open image
        image = Image.open(io.BytesIO(image_data))
        
        # Perform ELA
        ela_image = self.perform_ela(image)
        
        # Prepare image for model
        image = image.resize(self.image_size)
        image_array = tf.keras.preprocessing.image.img_to_array(image)
        image_array = tf.keras.applications.resnet_v2.preprocess_input(image_array)
        image_array = tf.expand_dims(image_array, 0)
        
        # Get prediction
        prediction = self.model.predict(image_array)[0][0]
        
        return {
            'is_forged': bool(prediction > 0.5),
            'confidence': float(prediction * 100)
        }