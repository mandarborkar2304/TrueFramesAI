import os
from ml_model import ForgeryDetector

def main():
    # Initialize the detector
    detector = ForgeryDetector()
    
    # Set paths to CASIA dataset
    authentic_dir = 'path/to/CASIA/Au'  # Update with actual path
    tampered_dir = 'path/to/CASIA/Tp'   # Update with actual path
    
    # Train the model
    print("Starting model training...")
    history = detector.train(
        authentic_dir=authentic_dir,
        tampered_dir=tampered_dir,
        epochs=20
    )
    
    print("Training completed!")
    print(f"Final validation accuracy: {history.history['val_accuracy'][-1]:.4f}")

if __name__ == '__main__':
    main()