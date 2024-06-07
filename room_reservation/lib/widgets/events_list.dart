import 'package:flutter/material.dart';
import 'package:user_mngmnt_app/models/event.dart';
import 'package:user_mngmnt_app/widgets/event_item.dart';

class EventsList extends StatelessWidget {
  const EventsList({super.key, required this.events});

  final List<Event> events;

  @override
  Widget build(BuildContext context) {
    return ListView.separated(
      itemBuilder: (context, index) => EventItem(event: events[index]),
      itemCount: events.length,
      separatorBuilder: (context, index) {
        return Divider(
          height: 1,
          color: Colors.grey.withOpacity(.3),
        );
      },
    );
  }
}
