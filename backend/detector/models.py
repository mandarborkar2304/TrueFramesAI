from django.db import models
from django.contrib.auth.models import User

class Analysis(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='analysis/')
    is_forged = models.BooleanField()
    confidence = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Analysis for {self.user.username} at {self.created_at}"