import { Loader2 } from 'lucide-react';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { NavigationProvider, useNavigation } from '@/context/NavigationContext';
import { isFirebaseConfigured } from '@/firebase';
import { SetupScreen } from '@/screens/SetupScreen';
import { AuthScreen } from '@/screens/AuthScreen';
import { HomeScreen } from '@/screens/HomeScreen';
import { AsNotesScreen } from '@/screens/AsNotesScreen';
import { A2TopicsScreen } from '@/screens/A2TopicsScreen';
import { QuizPickerScreen } from '@/screens/QuizPickerScreen';
import { MyNotesScreen } from '@/screens/MyNotesScreen';

function CurrentScreen() {
  const { current } = useNavigation();
  switch (current) {
    case 'home':
      return <HomeScreen />;
    case 'as-notes':
      return <AsNotesScreen />;
    case 'a2-topics':
      return <A2TopicsScreen />;
    case 'quiz-picker':
      return <QuizPickerScreen />;
    case 'my-notes':
      return <MyNotesScreen />;
    default:
      return <HomeScreen />;
  }
}

function Gate() {
  const { user, loading } = useAuth();

  if (!isFirebaseConfigured) return <SetupScreen />;

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center text-slate-400">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="mt-3 text-sm">Loading ChemMate…</p>
      </div>
    );
  }

  if (!user) return <AuthScreen />;

  return (
    <NavigationProvider>
      <CurrentScreen />
    </NavigationProvider>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Gate />
    </AuthProvider>
  );
}
