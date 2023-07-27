# Dokumentacja

## Identyfikacja zagadnienia biznesowego

W dzisiejszych czasach, kiedy dostęp do informacji jest łatwiejszy niż kiedykolwiek, pacjenci coraz częściej szukają informacji o lekarzach online przed umówieniem wizyty. Chociaż istnieje wiele stron internetowych z recenzjami lekarzy, wiele z nich nie oferuje możliwości dodawania szczegółowych komentarzy lub ocen przez pacjentów. Ponadto, niektóre z tych stron nie mają funkcji logowania, co oznacza, że każdy może dodawać recenzje, co może prowadzić do fałszywych ocen.

Nasza aplikacja ma na celu zaspokojenie tej potrzeby biznesowej, oferując platformę, na której pacjenci mogą bezpiecznie logować się i dodawać szczegółowe recenzje i oceny lekarzy. Aplikacja ta będzie służyć zarówno pacjentom, którzy szukają wiarygodnych informacji o lekarzach, jak i lekarzom, którzy chcą zdobyć opinie od swoich pacjentów i poprawić swoje usługi.

## Opis zakresu projektu w kontekście potrzeby biznesowej

Nasza aplikacja ma na celu rozwiązanie problemu braku wiarygodnych i szczegółowych recenzji lekarzy online. Aplikacja ta pozwoli pacjentom na dodawanie recenzji i ocen lekarzy, a lekarzom na zdobywanie opinii od swoich pacjentów. Aplikacja będzie również zawierać funkcję logowania, aby zapewnić, że tylko zarejestrowani użytkownicy mogą dodawać recenzje.

Chociaż nasza aplikacja rozwiązuje konkretny problem, nie wyczerpuje całkowicie zagadnienia zarządzania opinią online w sektorze opieki zdrowotnej. Istnieją inne aspekty, takie jak moderacja recenzji, zarządzanie reputacją online dla lekarzy, i analiza sentymentu recenzji, które nasza aplikacja nie obejmuje. Jednakże, nasza aplikacja może być ważnym elementem większego systemu zarządzania opinią online dla sektora opieki zdrowotnej.

## Wymagania systemowe i funkcjonalne

Nasza aplikacja będzie składać się z trzech głównych komponentów: serwera backendowego, bazy danych i interfejsu użytkownika.

### Wymagania funkcjonalne:

Rejestracja i logowanie: Użytkownicy powinni mieć możliwość rejestracji i logowania. Rejestracja powinna wymagać podstawowych informacji, takich jak imię, nazwisko, login i hasło.

Dodawanie recenzji: Zalogowani użytkownicy powinni mieć możliwość dodawania recenzji i ocen lekarzy. Recenzja powinna zawierać tekst komentarza i ocenę w skali od 1 do 5.

Przeglądanie recenzji: Wszyscy użytkownicy, niezależnie od tego, czy są zalogowani, czy nie, powinni mieć możliwość przeglądania recenzji lekarzy.

### Wymagania techniczne:

Serwer backendowy: Serwer backendowy będzie napisany w Express.js, popularnym frameworku Node.js. Serwer będzie obsługiwać wszystkie żądania HTTP od klientów, takie jak żądania logowania, rejestracji i dodawania recenzji.

Baza danych: Baza danych będzie zarządzana za pomocą MySQL. Baza danych będzie składać się z trzech tabel: users, doctors i comments.

Interfejs użytkownika: Interfejs użytkownika będzie napisany w React, popularnej bibliotece JavaScript do budowy interfejsów użytkownika. Interfejs będzie responsywny i łatwy w użyciu.

### Model architektury:

Nasza aplikacja będzie oparta na architekturze klient-serwer. Klient (interfejs użytkownika) będzie komunikować się z serwerem za pomocą żądań HTTP. Serwer będzie przetwarzać te żądania, komunikować się z bazą danych w celu pobrania lub zapisania danych, a następnie zwracać odpowiedzi do klienta. Baza danych będzie przechowywać wszystkie dane aplikacji, takie jak informacje o użytkownikach, lekarzach i recenzjach.

## Analiza zagadnienia i jego modelowanie

W kontekście analizy i modelowania zagadnienia, skupimy się na metodach obiektowych, tworząc diagram klas, który jest najbardziej odpowiedni dla naszej aplikacji opartej na Express.js, MySQL i React.

Klasa User: Reprezentuje użytkownika w systemie. Każdy użytkownik ma unikalne id, name, surname, login, password_hash i isDoctor (flaga wskazująca, czy użytkownik jest lekarzem).

Klasa Doctor: Reprezentuje lekarza w systemie. Każdy lekarz ma user_id (które jest kluczem obcym odnoszącym się do id w klasie User), speciality i localization.

Klasa Comment: Reprezentuje komentarz dodany przez użytkownika do lekarza. Każdy komentarz ma unikalne id, doctor_id (które jest kluczem obcym odnoszącym się do user_id w klasie Doctor), user_id (które jest kluczem obcym odnoszącym się do id w klasie User), comment i mark.

Metody strukturalne:

Diagram związków encji (ERD): Diagram ERD dla naszej aplikacji będzie bardzo podobny do diagramu klas UML, z trzema encjami (User, Doctor, Comment) i związkami między nimi.

Diagram przepływu danych: Diagram przepływu danych dla naszej aplikacji będzie pokazywać, jak dane przepływają między klientem, serwerem i bazą danych. Na przykład, kiedy użytkownik dodaje recenzję, dane przepływają od klienta do serwera, a następnie do bazy danych. Kiedy użytkownik przegląda recenzje, dane przepływają od bazy danych do serwera, a następnie do klienta.

Diagram przejść: Diagram przejść dla naszej aplikacji będzie pokazywać, jak użytkownik może przechodzić między różnymi stronami aplikacji, takimi jak strona logowania, strona rejestracji, strona dodawania recenzji i strona przeglądania recenzji.

## Implementacja

### Przeglądanie listy lekarzy

W pliku `App.tsx`, korzystając z `React Router`, są zdefiniowane ścieżki do różnych stron. Użytkownik może mieć dostęp do strony z listą lekarzy poprzez kliknięcie na link "Strona główna".

Strona główna (plik `home.tsx`) pobiera listę lekarzy z serwera przy użyciu funkcji `fetchDoctors`, która korzysta z biblioteki `axios` do wykonania żądania GET na endpoint `/api/doctors`. Wyniki są następnie zapisywane w stanie komponentu za pomocą hooka `useState`. Strona również zawiera pole do wyszukiwania lekarzy. Wpisanie wartości w to pole spowoduje wywołanie `fetchDoctors` z zapytaniem, które filtruje lekarzy na podstawie ich imienia i nazwiska.

Od strony backendu w pliku `doctorRoutes.js`, są zdefiniowane różne trasy dla żądań związanych z lekarzami. Trasa `/doctors` obsługiwana jest przez kontroler `doctorsControler`, który wykonuje odpowiednie zapytanie do bazy.

### Wyświetlanie profilu lekarza

trasa `/doctor/:id` prowadzi do profilu lekarza. W komponencie `DoctorPage`, identyfikator lekarza jest pobierany z parametrów trasy za pomocą hooka `useParams` z `React Router`.

Aby wyświetlić profil lekarza, `DoctorPage` wykonuje żądanie GET do endpointu `/api/doctor/:id` za pomocą `axios`, a otrzymane dane są zapisywane w stanie komponentu za pomocą hooka `useState` od `React`. To obejmuje szczegóły lekarza, takie jak imię, nazwisko, specjalność i lokalizacja.

Dodatkowo, `DoctorPage` pobiera również listę opinii dla danego lekarza, wykonując żądanie GET do endpointu `/api/reviews/:doctorId`. Opinie są potem renderowane na stronie, każda zawierając informacje o autorze, ocenę i komentarz.
Wykorzystywana jest dodatkowa biblioteka `react-stars` pozwalająca na użycie komponentu `ReactStars` związanego z wystawiwaniem oceny.

Na backendzie, zapytania HTTP są obsługiwane przez konteoller `doctorsController.js`. Wykonywane są pytania do bazy danych MySQL za pomocą biblioteki `mysql2`, a następnie zwracane są wyniki jako odpowiedź JSON.

### Dodawanie opinii

Komponent `DoctorPage` zawiera komponent `ReviewForm`, który jest formularzem do dodawania opinii. W `ReviewForm` są dwa stany - dla oceny (`rating`) i komentarza (`comment`). Biblioteka `ReactStars` jest używana do wyboru oceny w formularzu. Zmiany w formularzu są obsługiwane przez `handleRatingChange` i `handleCommentChange`, które aktualizują stany.

Gdy formularz jest wysyłany, funkcja `handleSubmit` jest wywoływana. Ta funkcja wykonuje żądanie POST do serwera, przekazując identyfikator użytkownika, identyfikator lekarza, ocenę i komentarz. W tym celu korzysta z biblioteki `axios`.

Na backendzie, trasa `/reviews` w pliku `doctorsRoutes.js` jest obsługiwana przez kontroler `doctorsController.js`. Kontroler ten pobiera dane z żądania, a następnie wykonuje zapytanie SQL do bazy danych, które dodaje nowy rekord do tabeli comments. 
Po pomyślnym dodaniu opinii, strona jest odświeżana, co powoduje ponowne załadowanie danych o lekarzu i jego opiniach.

## Podsumowanie

Projekt aplikacji został pomyślnie zrealizowany, osiągając zakładane cele. Celem projektu było stworzenie platformy, na której pacjenci mogą bezpiecznie logować się i dodawać szczegółowe recenzje i oceny lekarzy. Przez dostarczenie tej funkcjonalności, aplikacja może służyć zarówno pacjentom, którzy szukają wiarygodnych informacji o lekarzach, jak i lekarzom, którzy chcą zdobyć opinie od swoich pacjentów i poprawić swoje usługi.

W trakcie realizacji projektu napotkano pewne trudności. Wyzwaniem było znalezienie odpowiedniej struktury bazy danych, która pozwoliła na skuteczne zarządzanie relacjami między użytkownikami, lekarzami i opiniami.Perspektywy rozwoju dla med-app są obiecujące. 

Chociaż aplikacja rozwiązuje konkretne zagadnienie braku wiarygodnych i szczegółowych recenzji lekarzy online, nie wyczerpuje całkowicie problemu zarządzania opinią online w sektorze opieki zdrowotnej. W związku z tym, istnieje wiele możliwości na dalsze rozszerzenie funkcjonalności aplikacji.
