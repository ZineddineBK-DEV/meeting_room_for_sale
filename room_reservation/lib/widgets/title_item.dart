import 'package:flutter/material.dart';

class TitleItem extends StatelessWidget {
  final String title;
  final double fontSize;
  final Color color;
  const TitleItem(
      {super.key, required this.title, required this.fontSize, required this.color});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          style: TextStyle(
              fontSize: fontSize, color: color, fontWeight: FontWeight.bold),
        ),
        const SizedBox(
          height: 10,
        ),
        SizedBox(
          width: 50,
          child: Container(
            color: color,
            height: 10,
          ),
        ),
      ],
    );
  }
}
