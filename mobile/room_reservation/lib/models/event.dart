import 'package:user_mngmnt_app/models/user.dart';

class Event {
  String? id;
  final String title;
  final DateTime start;
  final DateTime end;
  final Map<String, dynamic> applicant;

  Event(
      {this.id,
      required this.title,
      required this.start,
      required this.applicant,
      required this.end});

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'title': title,
      'start': start,
      'end': end,
      'applicant': applicant,
    };
  }

  factory Event.fromMap(Map<String, dynamic> map) {
    return Event(
        id: map['_id'],
        title: map['title'],
        start: DateTime.parse(map['start']).toUtc(),
        end: DateTime.parse(map['end']).toUtc(),
        applicant: map['applicant']
    );
  }
}
