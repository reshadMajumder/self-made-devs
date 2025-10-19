from django.db import models


class DevWingRegistration(models.Model):
    POSITION_CHOICES = [
        ('Senior Deputy', 'Senior Deputy'),
        ('Deputy', 'Deputy'),
        ('Junior Deputy', 'Junior Deputy'),
        ('Senior Executive', 'Senior Executive'),
        ('Executive', 'Executive'),
        ('Junior Executive', 'Junior Executive'),
    ]

    full_name = models.CharField(max_length=255)
    student_id = models.CharField(max_length=50)
    department = models.CharField(max_length=100)
    batch = models.CharField(max_length=50)
    position = models.CharField(max_length=50, choices=POSITION_CHOICES)
    email = models.EmailField(unique=True)

    technical_skills = models.TextField(
        help_text="Describe your technical skills or areas of expertise."
    )
    programming_tools = models.TextField(
        help_text="Mention the languages, frameworks, or tools you know or are learning."
    )
    motivation = models.TextField(
        help_text="Explain why you want to be part of the Development Wing."
    )
    experience = models.TextField(
        null=True, blank=True,
        help_text="Mention any experience, projects, or GitHub/portfolio links."
    )

    photo_link = models.URLField(
        help_text="Google Drive link to your photo."
    )
    cv_link = models.URLField(
        null=True, blank=True,
        help_text="Google Drive or portfolio link (optional)."
    )

    submitted_at = models.DateTimeField(auto_now_add=True)
    

    def __str__(self):
        return f"{self.full_name} ({self.position})"
