from rest_framework import generics, viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import authenticate, login, logout
from datetime import date
from .models import Teacher, Student, Attendance
from .serializers import TeacherRegisterSerializer, StudentRegisterSerializer, AttendanceSerializer, SimpleStudentSerializer
from rest_framework.decorators import action


# -------------------------------
# Teacher Registration
# -------------------------------
class TeacherRegisterView(generics.CreateAPIView):
    queryset = Teacher.objects.all()
    serializer_class = TeacherRegisterSerializer
    permission_classes = [permissions.AllowAny]

# -------------------------------
# Student Registration
# -------------------------------
class StudentRegisterView(generics.CreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentRegisterSerializer
    permission_classes = [permissions.AllowAny]

# -------------------------------
# Login (same for both)
# -------------------------------
@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(request, username=username, password=password)
    if user:
        login(request, user)
        return Response({"message": "Login successful"})
    return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

# -------------------------------
# Logout
# -------------------------------
@api_view(['POST'])
def logout_view(request):
    logout(request)
    return Response({"message": "Logged out successfully"})

# -------------------------------
# Attendance CRUD
# -------------------------------
# ------------------------------- Teacher Dashboard -------------------------------
class AttendanceViewSet(viewsets.ModelViewSet):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['get'], url_path='students')
    def list_students(self, request):
        """
        Teacher dashboard: list all students
        """
        students = Student.objects.all()
        serializer = SimpleStudentSerializer(students, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['post'], url_path='mark')
    def mark_attendance(self, request):
        """
        Teacher marks attendance for a student
        """
        student_id = request.data.get('student_id')
        status_val = request.data.get('status')  # "present" or "absent"

        if not student_id or not status_val:
            return Response({'error': 'student_id and status are required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            student = Student.objects.get(id=student_id)
        except Student.DoesNotExist:
            return Response({'error': 'Student not found'}, status=status.HTTP_404_NOT_FOUND)

        attendance, created = Attendance.objects.get_or_create(student=student, date=date.today())
        attendance.status = status_val
        attendance.save()

        serializer = AttendanceSerializer(attendance)
        return Response(serializer.data, status=status.HTTP_200_OK)

# ------------------------------- Student Dashboard -------------------------------
class StudentAttendanceView(generics.ListAPIView):
    """
    Student dashboard: view own attendance
    """
    serializer_class = AttendanceSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        try:
            student = self.request.user.student
            return Attendance.objects.filter(student=student).order_by('-date')
        except Student.DoesNotExist:
            return Attendance.objects.none()
