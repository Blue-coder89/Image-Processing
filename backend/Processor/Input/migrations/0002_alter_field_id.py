# Generated by Django 4.0.5 on 2022-06-25 04:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Input', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='field',
            name='id',
            field=models.CharField(max_length=100, primary_key=True, serialize=False),
        ),
    ]
