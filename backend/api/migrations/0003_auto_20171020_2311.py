# -*- coding: utf-8 -*-
# Generated by Django 1.9.13 on 2017-10-20 23:11
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_reader'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='reader',
            name='book',
        ),
        migrations.RemoveField(
            model_name='reader',
            name='user',
        ),
        migrations.DeleteModel(
            name='Reader',
        ),
    ]
