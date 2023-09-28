# Generated by Django 4.2 on 2023-09-21 13:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='status',
            field=models.CharField(choices=[('active', 'Active'), ('sick', 'Sick'), ('on_vacation', 'On Vacation'), ('away', 'Away'), ('offline', 'Offline')], default='active', max_length=20),
        ),
        migrations.DeleteModel(
            name='UserStatus',
        ),
    ]