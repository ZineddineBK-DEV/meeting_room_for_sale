class Room {
  String id;
  final String label;
  final String image;
  final String capacity;

  Room(
      {required this.id,
      required this.label,
      required this.image,
      required this.capacity});

  factory Room.fromMap(Map<String, dynamic> map) {
    try {
      return Room(
      id: map['_id'],
      label: map['label'],
      capacity: "${map['capacity']}",
      image:map['image']
    );
    } catch (e) {
      rethrow;
    }
  }
}
