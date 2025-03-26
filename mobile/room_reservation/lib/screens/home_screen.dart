import 'dart:async';

import 'package:flutter/material.dart';
import 'package:get_it/get_it.dart';
import 'package:user_mngmnt_app/fragments/left_bar.dart';
import 'package:user_mngmnt_app/fragments/middle_bar.dart';
import 'package:user_mngmnt_app/fragments/no_events_room_selected.dart';
import 'package:user_mngmnt_app/fragments/no_room_selected.dart';
import 'package:user_mngmnt_app/fragments/right_bar.dart';
import 'package:user_mngmnt_app/models/event.dart';
import 'package:user_mngmnt_app/models/room.dart';
import 'package:user_mngmnt_app/services/events_service.dart';
import 'package:user_mngmnt_app/utils/const.dart';
import 'package:user_mngmnt_app/utils/utils.dart';

class HomeScreen extends StatefulWidget {
  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  EventService eventService = GetIt.I<EventService>();

  List<Event> events = [];
  bool isReserved = false;
  late Room? currentRoom;
  Event? currentEvent;
  int selectedImageIndex = 0;
  String bgImage = "";


  setBgImage(String url){
    setState(() {
      bgImage = url;
    });
  }

  @override
  void initState() {
    currentRoom = null;
    super.initState();
    Timer.periodic(
      const Duration(seconds: 5),
      (timer) {
        fetchEvents();
      },
    );
  }

  fetchEvents() async {
    if (currentRoom != null) {
      final data = await eventService.findAllEvents(currentRoom!.id);
      setState(() {
        events = data;
        currentEvent = findCurrentEvent();
        //remove the current event from upcoming events
        if (currentEvent != null) {
          events.removeAt(0);
        }
        isReserved = currentEvent != null ? true : false;
      });
    }
  }

  Event? findCurrentEvent() {
    if (events.isEmpty) {
      return null;
    }
    DateTime now = Utils.getCurrentZonedDateTime();
    Event firstEvent = events[0];
    if (now.isAfter(firstEvent.start) && now.isBefore(firstEvent.end)) {
      return firstEvent;
    }
    return null;
  }

  void handleRoomChange(Room room) {
    setState(() {
      currentRoom = room ?? null;
    });
    setBgImage(room.image);
  }

  @override
  Widget build(BuildContext context) {
    final screenWidth = MediaQuery.of(context).size.width;
    final screenHeight = MediaQuery.of(context).size.height;

    return Hero(
      tag: "background_image",
      child: SizedBox(
        width: screenWidth,
        height: screenHeight,
        child: Stack(
          children: [
            Container(
              color: Colors.black,
            ),
            BackgroundContainer(
              imageUrl: bgImage,
            ),
            Row(
              children: [
                SizedBox(
                  width: screenWidth * 0.25, // Adjust the width as needed
                  child: LeftBar(
                    isReserved: isReserved,
                    handleRoomChange: handleRoomChange,
                  ),
                ),
                Expanded(
                  child: renderMiddle(),
                ),
                SizedBox(
                  width: screenWidth * 0.25, // Adjust the width as needed
                  child: RightBar(events: events),
                ),
              ],
            )
          ],
        ),
      ),
    );
  }


  Widget renderMiddle() {
    if (currentRoom == null) {
      return const NoRoomSelected();
    }
    if (currentRoom != null && currentEvent == null) {
      return RoomSelectedNoEvents(currentRoom: currentRoom!);
    }
    return MiddleBar(currentEvent: currentEvent!, currentRoom: currentRoom!);
  }
}

class BackgroundContainer extends StatefulWidget {
  final String imageUrl;
  const BackgroundContainer({super.key, required this.imageUrl});

  @override
  State<BackgroundContainer> createState() => _BackgroundContainerState();
}

class _BackgroundContainerState extends State<BackgroundContainer> {
  @override
  Widget build(BuildContext context) {
    return AnimatedContainer(
      duration: const Duration(seconds: 2),
      decoration: BoxDecoration(
        image:  DecorationImage(
            image: widget.imageUrl.isNotEmpty ?  NetworkImage("http://$ip:$port/roomImages/${widget.imageUrl}") : NetworkImage("http://$ip:$port/roomImages/default.png"),
            fit: BoxFit.contain),
      ),
    );
  }
}
