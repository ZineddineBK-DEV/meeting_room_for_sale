import 'package:flutter/material.dart';
import 'package:user_mngmnt_app/models/room.dart';

class RoomSelectedNoEvents extends StatelessWidget {
  final Room currentRoom;
  const RoomSelectedNoEvents({super.key, required this.currentRoom});

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.black.withOpacity(.5),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(
            currentRoom.label,
            style: const TextStyle(
                fontSize: 80, color: Colors.white, fontWeight: FontWeight.bold),
          ),
          const Text(
            "Disponible",
            style: TextStyle(fontSize: 60, color: Colors.green),
          )
        ],
      ),
    );
  }
}
