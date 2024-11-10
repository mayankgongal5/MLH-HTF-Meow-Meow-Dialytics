import 'package:flutter/material.dart';
import 'package:supabase_auth_ui/supabase_auth_ui.dart';
import 'home.dart';
import 'login_page.dart';
import 'creds.dart';
import 'package:supabase/supabase.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  await Supabase.initialize(
    url: Creds.SUPABASE_URL,
    anonKey: Creds.SUPABASE_ANON_KEY,
  );

  final session = Supabase.instance.client.auth.currentSession;

  runApp(MyApp(startPage: session == null ? LoginPage() : HomePage()));
}

class MyApp extends StatelessWidget {
  final Widget startPage;

  MyApp({required this.startPage});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Dialytics',
      debugShowCheckedModeBanner: false,
      home: startPage,
    );
  }
}






//hi
