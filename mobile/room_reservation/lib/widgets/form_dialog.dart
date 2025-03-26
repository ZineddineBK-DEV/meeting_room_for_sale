import 'package:flutter/material.dart';

class FormDialog {
  static showMyDialog(BuildContext context) async {
    TextEditingController _title = TextEditingController();
    TextEditingController _owner = TextEditingController();
    TextEditingController _date = TextEditingController();
    TextEditingController _time = TextEditingController();

    return showDialog<void>(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          content: SingleChildScrollView(
            padding: EdgeInsets.all(20),
            child: Column(
              children: [
                const Text(
                  'Ajouter un évènnement',
                  style: TextStyle(fontSize: 30),
                ),
                const SizedBox(
                  height: 20,
                ),
                TextField(
                  controller: _title,
                  decoration: InputDecoration(
                    labelText: "Titre",
                    border: OutlineInputBorder(
                      borderSide:
                          BorderSide(color: Colors.grey.withOpacity(.2)),
                    ),
                  ),
                ),
                const SizedBox(
                  height: 10,
                ),
                TextField(
                  controller: _owner,
                  decoration: const InputDecoration(labelText: 'Meeting leader'),
                ),
                TextField(
                  controller: _date,
                  decoration: const InputDecoration(labelText: 'Date'),
                ),
                TextField(
                  controller: _time,
                  decoration: const InputDecoration(labelText: 'Heure'),
                ),
              ],
            ),
          ),
          actions: <Widget>[
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              child: const Text('Cancel'),
            ),
            ElevatedButton(
              onPressed: () {
                // Access the values in the text fields
                String value1 = _title.text;
                String value2 = _owner.text;

                // Do something with the values (e.g., validate or process)

                // Close the dialog
                Navigator.of(context).pop();
              },
              child: const Text('Submit'),
            ),
          ],
        );
      },
    );
  }
}
