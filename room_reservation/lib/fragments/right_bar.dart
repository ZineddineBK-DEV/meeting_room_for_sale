import 'package:flutter/material.dart';
import 'package:user_mngmnt_app/models/event.dart';
import 'package:user_mngmnt_app/widgets/events_list.dart';
import 'package:user_mngmnt_app/widgets/title_item.dart';

class RightBar extends StatelessWidget {
  final List<Event> events;
  const RightBar({super.key, required this.events});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 30, horizontal: 20),
      color: Colors.black.withOpacity(.8),
      width: MediaQuery.of(context).size.width * 0.24,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          const TitleItem(
            title: "UPCOMING",
            fontSize: 40,
            color: Colors.teal,
          ),
          const SizedBox(
            height: 10,
          ),
          Expanded(
            child: EventsList(events: events),
          ),
          const SizedBox(
            height: 10,
          ),
        ],
      ),
    );
  }
}
