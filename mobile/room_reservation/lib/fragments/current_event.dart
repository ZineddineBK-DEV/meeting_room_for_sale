import 'package:flutter/material.dart';
import 'package:user_mngmnt_app/models/event.dart';
import 'package:user_mngmnt_app/utils/utils.dart';

class CurrentEvent extends StatelessWidget {
  Event currentEvent;
  CurrentEvent({super.key, required this.currentEvent});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          "NOW",
          style: TextStyle(
              fontSize: 100, color: Colors.deepOrange, fontWeight: FontWeight.bold),
        ),
        Text(
          currentEvent.title,
          style: const TextStyle(fontSize: 80, color: Colors.redAccent),
        ),
        Text(
          "${Utils.timeToString(currentEvent.start, 'HH:mm')} - ${Utils.timeToString(currentEvent.end, 'HH:mm')}",
          style: const TextStyle(fontSize: 80, color: Colors.redAccent),
        ),
        const SizedBox(
          height: 15,
        ),
        const Text(
          "Meeting creator",
          style: TextStyle(fontSize: 100, color: Colors.white),
        ),
        Text(
          '${currentEvent.applicant['name']} ',
          style: const TextStyle(
            fontSize: 70,
            color: Colors.amber,
            fontWeight: FontWeight.bold,
          ),
        ),
        /*const SizedBox(
          height: 60,
        ),*/
        /* ElevatedButton(
          style: ElevatedButton.styleFrom(
              backgroundColor: Colors.red,
              padding: EdgeInsets.symmetric(horizontal: 30, vertical: 20),
              elevation: 0),
          onPressed: () {},
          child: Text(
            "END MEETING",
            style: TextStyle(color: Colors.white),
          ),
        ) */
      ],
    );
  }
}
