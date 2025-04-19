from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Analysis
from .ml_model import ForgeryDetector
from django.core.files.base import ContentFile
import base64

class AnalysisViewSet(viewsets.ModelViewSet):
    detector = ForgeryDetector()
    
    def create(self, request):
        try:
            # Get image data from request
            image_data = base64.b64decode(request.data['image'].split(',')[1])
            
            # Analyze image
            result = self.detector.analyze_image(image_data)
            
            # Save analysis
            analysis = Analysis.objects.create(
                user=request.user,
                is_forged=result['is_forged'],
                confidence=result['confidence']
            )
            
            # Save image file
            image_name = f'analysis_{analysis.id}.jpg'
            analysis.image.save(image_name, ContentFile(image_data))
            
            return Response({
                'id': analysis.id,
                'is_forged': result['is_forged'],
                'confidence': result['confidence'],
                'created_at': analysis.created_at
            }, status=status.HTTP_201_CREATED)
            
        except Exception as e:
            return Response({
                'error': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)