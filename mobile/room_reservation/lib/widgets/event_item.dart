import 'package:flutter/material.dart';
import 'package:user_mngmnt_app/models/event.dart';
import 'package:user_mngmnt_app/utils/utils.dart';

class EventItem extends StatelessWidget {
  final Event event;
  const EventItem({super.key, required this.event});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 15),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            event.title,
            style: const TextStyle(
              color: Colors.cyanAccent,
              fontSize: 40,
            ),
          ),
          Row(
            children: [
              Icon(
                Icons.calendar_month_outlined,
                color: Colors.blue[300],
              ),
              const SizedBox(
                width: 5,
              ),
              Text(
                Utils.timeToString(event.start, "EEEE, d MMM y"),
                style: TextStyle(
                  color: Colors.blue[300],
                  fontSize: 18,
                ),
              ),
            ],
          ),
          Row(
            children: [
              const Icon(
                Icons.access_alarm,
                color: Colors.white,
              ),
              const SizedBox(
                width: 5,
              ),
              Text(
                "${Utils.timeToString(event.start, 'HH:mm')} - ${Utils.timeToString(event.end, 'HH:mm')}",
                style: const TextStyle(
                  color: Colors.white,
                  fontSize: 20,
                ),
              ),
            ],
          ),
          /*  Text(
            "${Utils.timeToString(event.start, 'HH:mm')} - ${Utils.timeToString(event.end, 'HH:mm')}",
            style: TextStyle(
              color: Colors.white,
              fontSize: 16,
            ),
          ), */
          /* Divider(
            thickness: 0.5,
          ) */
        ],
      ),
    );
  }
}
