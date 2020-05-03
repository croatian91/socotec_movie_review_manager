from celery import shared_task
import time


@shared_task
def sleep():
    time.sleep(10)
