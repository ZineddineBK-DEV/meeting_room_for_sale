import 'package:flutter/material.dart';

class NoRoomSelected extends StatelessWidget {
  const NoRoomSelected({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.black.withOpacity(.5),
      child: const Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Center(
            child: Text(
              "SELECT ROOM",
              style: TextStyle(
                fontSize: 70,
                color: Colors.teal,
                fontWeight: FontWeight.w400,
              ),
            ),
          )

        ],
      ),
    );
  }
}
