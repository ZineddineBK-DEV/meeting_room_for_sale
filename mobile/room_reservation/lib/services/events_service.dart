import 'package:dio/dio.dart';
import 'package:user_mngmnt_app/models/event.dart';
import 'package:user_mngmnt_app/utils/utils.dart';
import '../utils/const.dart';

class EventService {
  final Dio _dio = Dio();

  Future<List<Event>> findAllEvents(String roomID) async {
    print("============== [EVENT SERVICE] find all events =============");
    final response = await _dio
        .get('$baseUrl/api/material/room/tablette/getRoomEvents/$roomID');
    print(true);
    List<Event> events = [];
    for (var item in response.data['data']) {
      events.add(Event.fromMap(item));
    }
    return filterUpcomingEvents(events);
  }

  filterUpcomingEvents(List<Event> events) {
    events.sort((a, b) => a.start.compareTo(b.start));
    final now = Utils.getCurrentZonedDateTime();
    final upcoming = events.where((event) => now.isBefore(event.end)).toList();
    return upcoming;
  }
}
