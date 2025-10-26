# urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TeacherRegisterView, StudentRegisterView, AttendanceViewSet, login_view, logout_view, StudentAttendanceView

router = DefaultRouter()
router.register('attendance', AttendanceViewSet, basename='attendance')

urlpatterns = [
    path('teacher/register/', TeacherRegisterView.as_view(), name='teacher-register'),
    path('student/register/', StudentRegisterView.as_view(), name='student-register'),
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
    path('my-attendance/', StudentAttendanceView.as_view(), name='student-attendance'),
]

urlpatterns += router.urls
