import 'package:flutter/material.dart';
import 'package:get_it/get_it.dart';
import 'package:user_mngmnt_app/models/room.dart';
import 'package:user_mngmnt_app/services/room_service.dart';

class CustomDropdown extends StatefulWidget {
  final Function handleRoomChange;
  const CustomDropdown({super.key, required this.handleRoomChange});

  @override
  State<CustomDropdown> createState() => _CustomDropdownState();
}

class _CustomDropdownState extends State<CustomDropdown> {
  RoomService roomService = GetIt.I<RoomService>();
  List<Room> rooms = [];
  Room? selectedRoom;

  @override
  void initState() {
    super.initState();
    fetchRooms();
  }

  fetchRooms() async {
    final data = await roomService.findAllRooms();
    setState(() {
      rooms = data;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        selectedRoom != null
            ? Row(
                children: [
                  const SizedBox(width: 70),
                  const Icon(
                    Icons.meeting_room_outlined,
                    color: Colors.teal,
                  ),
                  Expanded(
                    child: Align(
                      alignment: Alignment.centerLeft,
                      child: Text(
                        selectedRoom!.label,
                        style: const TextStyle(
                          color: Colors.teal,
                          fontSize: 18,
                        ),
                      ),
                    ),
                  ),
                ],
              )
            : const Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  SizedBox(width: 50),
                  Icon(
                    Icons.meeting_room_outlined,
                    color: Colors.white,
                  ),
                  // SizedBox(
                  //     width:
                  //         10), // Add spacing between the icon and the text if needed
                  Expanded(
                    child: Text(
                      "SHOW ROOM AVAILABILITY",
                      textAlign: TextAlign.center, // Center align the text
                      style: TextStyle(color: Colors.white),
                    ),
                  ),
                ],
              ),
        SizedBox(
          height: 250, // Adjust height as needed
          child: ListView.builder(
            itemCount: rooms.length,
            itemBuilder: (context, index) {
              final room = rooms[index];
              return GestureDetector(
                onTap: () {
                  widget.handleRoomChange(room);
                  setState(() {
                    selectedRoom = room;
                  });
                },
                child: Container(
                  padding: const EdgeInsets.all(10),
                  decoration: BoxDecoration(
                    color: selectedRoom == room ? Colors.blue : Colors.black12,
                    borderRadius: BorderRadius.circular(5),
                  ),
                  child: Padding(
                    padding: const EdgeInsets.only(left: 30.0),
                    child: Text(
                      room.label,
                      style: const TextStyle(color: Colors.white),
                    ),
                  ),
                ),
              );
            },
          ),
        ),
      ],
    );
  }
}
