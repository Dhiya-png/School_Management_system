from rest_framework import serializers
from .models import Teacher, Student, Attendance, CustomUser
from django.contrib.auth.hashers import make_password

# -------------------------------
# Teacher Serializer
# -------------------------------
class TeacherRegisterSerializer(serializers.ModelSerializer):
    username = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Teacher
        fields = ['username', 'password', 'name', 'email']

    def create(self, validated_data):
        username = validated_data.pop('username')
        password = validated_data.pop('password')
        user = CustomUser.objects.create(username=username)
        user.password = make_password(password)
        user.save()
        teacher = Teacher.objects.create(user=user, **validated_data)
        return teacher

# -------------------------------
# Student Serializer
# -------------------------------
class StudentRegisterSerializer(serializers.ModelSerializer):
    username = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Student
        fields = ['username', 'password', 'name', 'email', 'roll_no']

    def validate_username(self, value):
        if CustomUser.objects.filter(username=value).exists():
            raise serializers.ValidationError("This username is already taken.")
        return value

    def create(self, validated_data):
        username = validated_data.pop('username')
        password = validated_data.pop('password')
        user = CustomUser.objects.create(username=username)
        user.set_password(password) 
        user.save()
        student = Student.objects.create(user=user, **validated_data)
        return student
    

class SimpleStudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['id', 'name', 'email', 'roll_no']
# -------------------------------
# Attendance Serializer
# -------------------------------
class AttendanceSerializer(serializers.ModelSerializer):
    student = SimpleStudentSerializer(read_only=True)
    student_id = serializers.IntegerField(write_only=True, required=False)

    class Meta:
        model = Attendance
        fields = ['id', 'student_id', 'student', 'status', 'date']

    def create(self, validated_data):
        student_id = validated_data.pop('student_id', None)
        if student_id:
            try:
                student = Student.objects.get(id=student_id)
                validated_data['student'] = student
            except Student.DoesNotExist:
                raise serializers.ValidationError("Student not found.")
        return super().create(validated_data)



