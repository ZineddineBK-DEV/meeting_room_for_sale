import 'package:flutter/material.dart';
import 'package:user_mngmnt_app/screens/home_screen.dart';
import 'package:user_mngmnt_app/services/events_service.dart';
import 'package:get_it/get_it.dart';
import 'package:user_mngmnt_app/services/room_service.dart';

void setupLocator() {
  GetIt.instance.registerLazySingleton(() => EventService());
  GetIt.instance.registerLazySingleton(() => RoomService());
}

void main() {
  setupLocator();
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(fontFamily: 'Rubik'),
      home: Scaffold(
        body: HomeScreen(),
      ),
    );
  }
}
