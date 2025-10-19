from django.contrib import admin
from django.utils.html import format_html
from django.http import HttpResponse
import csv
from .models import DevWingRegistration


@admin.register(DevWingRegistration)
class DevWingRegistrationAdmin(admin.ModelAdmin):
    list_display = (
        'full_name',
        'student_id',
        'department',
        'batch',
        'position',
        'email',
        'photo_preview',
        'submitted_at',
    )

    list_filter = ('position', 'department', 'batch', 'submitted_at')
    search_fields = ('full_name', 'student_id', 'email', 'department', 'batch')
    ordering = ('-submitted_at',)
    actions = ['export_as_csv']

    fieldsets = (
        ('Basic Information', {
            'fields': (
                'full_name', 'student_id', 'department', 'batch', 'position', 'email'
            )
        }),
        ('Technical Profile', {
            'fields': (
                'technical_skills', 'programming_tools', 'motivation', 'experience'
            )
        }),
        ('Attachments', {
            'fields': ('photo_link', 'photo_preview', 'cv_link')
        }),
        ('Timestamps', {
            'fields': ('submitted_at',)
        }),
    )

    readonly_fields = ('photo_preview', 'submitted_at')

    # ✅ Fixed Google Drive image preview
    def photo_preview(self, obj):
        if not obj.photo_link:
            return "(No Photo)"

        link = obj.photo_link.strip()

        # Convert Google Drive share link → direct viewable image link
        if "drive.google.com" in link:
            file_id = None
            if "/d/" in link:
                # e.g. https://drive.google.com/file/d/FILE_ID/view
                try:
                    file_id = link.split("/d/")[1].split("/")[0]
                except IndexError:
                    pass
            elif "id=" in link:
                # e.g. https://drive.google.com/open?id=FILE_ID
                file_id = link.split("id=")[1].split("&")[0]

            if file_id:
                link = f"https://drive.google.com/uc?export=view&id={file_id}"

        return format_html(
            '<a href="{}" target="_blank">'
            '<img src="{}" style="width:80px; height:80px; border-radius:8px; object-fit:cover; box-shadow:0 0 5px #aaa;" />'
            '</a>',
            obj.photo_link, link
        )

    photo_preview.short_description = "Photo"

    # ✅ CSV Export
    def export_as_csv(self, request, queryset):
        meta = self.model._meta
        field_names = [field.name for field in meta.fields]

        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = f'attachment; filename={meta.verbose_name_plural}.csv'
        writer = csv.writer(response)
        writer.writerow(field_names)

        for obj in queryset:
            writer.writerow([getattr(obj, field) for field in field_names])

        return response

    export_as_csv.short_description = "Download selected as CSV"
