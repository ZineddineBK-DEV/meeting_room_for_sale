import 'dart:async';

import 'package:flutter/material.dart';
import 'package:user_mngmnt_app/utils/utils.dart';

class TimeDisplay extends StatefulWidget {
  @override
  State<TimeDisplay> createState() => _TimeDisplayState();
}

class _TimeDisplayState extends State<TimeDisplay> {
  String currentTime = '';
  String currentDate = '';
  String currentDateDay = '';

  @override
  void initState() {
    super.initState();
    Timer.periodic(
      const Duration(seconds: 5),
      (timer) {
        updateTime();
      },
    );
  }

  updateTime() {
    final dateTime = _getCurrentTime();
    setState(() {
      currentTime = dateTime[0];
      currentDate = dateTime[1];
      currentDateDay = dateTime[2];
    });
  }

  List<String> _getCurrentTime() {
    DateTime now = DateTime.now();
    String formattedTime = Utils.timeToString2(now, 'HH:mm');
    String formattedDateDay = Utils.timeToString(now, "EEEE");
    String formattedDate = Utils.timeToString2(now, "d MMM y");
    return [formattedTime, formattedDate, formattedDateDay];
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              currentTime,
              style: const TextStyle(
                fontSize: 90.0,
                color: Colors.white,
              ),
            ),
            Text(
              currentDateDay,
              style: const TextStyle(
                fontWeight: FontWeight.bold,
                fontSize: 45.0,
                color: Colors.white,
              ),
            ),
            Text(
              currentDate,
              style: const TextStyle(
                fontWeight: FontWeight.bold,
                fontSize: 35.0,
                color: Colors.white,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
