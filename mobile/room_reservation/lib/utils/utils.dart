import 'package:intl/intl.dart';

class Utils {
  static String timeToString(DateTime dateTime, String pattern) {
    return DateFormat(pattern).format(dateTime.add(const Duration(hours: 1)));
  }
  static String timeToString2(DateTime dateTime, String pattern) {
    return DateFormat(pattern).format(dateTime);
  }
  static DateTime getCurrentZonedDateTime() {
    return DateTime.now().toUtc();
  }
}
