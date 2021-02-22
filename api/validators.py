from django.utils import timezone
import datetime
from django.core.exceptions import ValidationError
from django.utils.translation import ugettext_lazy as _


def validate_date(date):
    dt = date
    dt = dt.replace(minute=0, second=0, microsecond=0)

    # after friday 15:00 case - acces to rest of this and whole next week
    if (
        timezone.now().date().weekday() >= 4
        and timezone.now().time()
        > datetime.time(hour=15, minute=0, second=0, microsecond=0)
        and date.isocalendar()[1] - timezone.now().isocalendar()[1] > 1
        or date != dt
    ):
        raise ValidationError(
            _("You must choose date from next week in format of full hours")
        )

    # before friday 15:00 case - acces to this week monday-friday only
    if (
        (
            date.date() < timezone.now().date()
            or date.date() == timezone.now().date()
            and date.time() < timezone.now().time()
        )
        or timezone.now().date().weekday() <= 4
        and timezone.now().time()
        < datetime.time(hour=15, minute=0, second=0, microsecond=0)
        and (
            date.isocalendar()[1] - timezone.now().isocalendar()[1] > 0
            or date.weekday() > 5
        )
        or date != dt
    ):
        raise ValidationError(
            _(
                "You must choose date from this week, up to friday in format of full hours"
            )
        )
