import 'package:flutter/material.dart';
import 'package:user_mngmnt_app/fragments/current_event.dart';
import 'package:user_mngmnt_app/models/event.dart';
import 'package:user_mngmnt_app/models/room.dart';
import 'package:user_mngmnt_app/widgets/title_item.dart';

class MiddleBar extends StatelessWidget {
  Event currentEvent;
  Room currentRoom;
  MiddleBar({super.key, required this.currentEvent, required this.currentRoom});


  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.black.withOpacity(.5),
      height: double.infinity,
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 50),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                TitleItem(
                  title: currentRoom.label,
                  fontSize: 90.0,
                  color: Colors.white,
                ),
                const SizedBox(
                  height: 40,
                ),
              ],
            ),
            Column(
              children: [
                SizedBox(
                  width: double.infinity,
                  child: CurrentEvent(currentEvent: currentEvent),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
