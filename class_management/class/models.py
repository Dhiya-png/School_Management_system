from django.db import models
from django.contrib.auth.models import AbstractUser

# Base Custom User
class CustomUser(AbstractUser):
    # You can add common fields here if needed
    pass

# Teacher Model
class Teacher(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='teacher')
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=200, blank=True, null=True)

    def __str__(self):
        return self.name

# Student Model
class Student(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='student')
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=200, blank=True, null=True)
    roll_no = models.CharField(max_length=20, blank=True, null=True)  # optional extra field

    def __str__(self):
        return self.name

# Attendance Model
class Attendance(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='attendances')
    date = models.DateField(auto_now_add=True)
    status = models.CharField(max_length=10, choices=[('present', 'P'), ('absent', 'A')])

    def __str__(self):
        return f"{self.student.name} - {self.date} - {self.status}"
