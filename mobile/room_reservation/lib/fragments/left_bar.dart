import 'package:flutter/material.dart';
import 'package:user_mngmnt_app/widgets/custom_dropdown.dart';
import 'package:user_mngmnt_app/widgets/time_display.dart';

class LeftBar extends StatelessWidget {
  final bool isReserved;
  final Function handleRoomChange;
  const LeftBar({super.key, required this.isReserved, required this.handleRoomChange});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.only(bottom: 45),
      width: MediaQuery.of(context).size.width * 0.27,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Container(
            height: MediaQuery.of(context).size.width * 0.22,
            width: double.infinity,
            decoration: BoxDecoration(
            color: isReserved
                ? Colors.red.withOpacity(.5)
                : Colors.teal[700]?.withOpacity(.5),
            borderRadius: BorderRadius.circular(20),
            ),// Add border radius here
            child: Center(
              child: TimeDisplay(),
            ),
          ),
          CustomDropdown(handleRoomChange: handleRoomChange),
        ],
      ),
    );
  }
}
