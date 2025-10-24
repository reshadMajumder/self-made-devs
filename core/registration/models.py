from django.db import models

class Registration(models.Model):
    full_name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    student_id = models.CharField(max_length=50)
    phone = models.CharField(max_length=20, null=True, blank=True)
    current_semester = models.IntegerField(null=True, blank=True)
    current_year = models.IntegerField(null=True, blank=True)
    interests = models.TextField()
    skills = models.TextField()
    github_url = models.URLField(null=True, blank=True)
    linkedin_url = models.URLField(null=True, blank=True)
    why_join = models.TextField()
    sec_membership = models.CharField(max_length=100, null=True, blank=True)
    transaction_id=models.CharField(max_length=50, null=True, blank=True)
    method=models.CharField(max_length=20, null=True, blank=True)
    project_idea = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.full_name} ({self.email})"
