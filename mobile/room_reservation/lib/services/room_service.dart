import 'package:dio/dio.dart';
import 'package:user_mngmnt_app/models/room.dart';
import '../utils/const.dart';

class RoomService {
  final Dio _dio = Dio();

  Future<List<Room>> findAllRooms() async {
    print("============== [ROOM SERVICE] find all ROOMS =============");
    final response =
    await _dio.get('$baseUrl/api/material/room/tablette/getAllRooms');
    List<Room> rooms = [];
    for (var item in response.data['data']) {
      rooms.add(Room.fromMap(item));
    }
    return rooms;
  }
}
