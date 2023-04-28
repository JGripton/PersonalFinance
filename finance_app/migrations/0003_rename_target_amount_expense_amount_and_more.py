# Generated by Django 4.1.7 on 2023-04-25 12:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('finance_app', '0002_rename_amount_expense_target_amount_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='expense',
            old_name='target_amount',
            new_name='amount',
        ),
        migrations.RemoveField(
            model_name='expense',
            name='current_amount',
        ),
        migrations.AddField(
            model_name='budget',
            name='current_amount',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
    ]
