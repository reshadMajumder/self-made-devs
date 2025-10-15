from django.contrib import admin
from django.http import HttpResponse
import csv
from .models import Registration

# Custom admin
class RegistrationAdmin(admin.ModelAdmin):
    # Columns to display in the list view
    list_display = ('full_name', 'email', 'phone', 'current_semester', 'current_year', 'created_at')
    
    # Fields to search
    search_fields = ('email', 'phone', 'full_name', 'student_id')
    
    # Add actions
    actions = ['export_as_csv']

    def export_as_csv(self, request, queryset):
        """Export selected registrations as CSV"""
        meta = self.model._meta
        field_names = [field.name for field in meta.fields]

        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename=registrations.csv'
        writer = csv.writer(response)

        # Write header
        writer.writerow(field_names)

        # Write data rows
        for obj in queryset:
            writer.writerow([getattr(obj, field) for field in field_names])

        return response

    export_as_csv.short_description = "Export Selected as CSV"

# Register the admin
admin.site.register(Registration, RegistrationAdmin)
