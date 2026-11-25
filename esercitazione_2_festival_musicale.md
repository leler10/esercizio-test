# Esercitazione — Festival Musicale

**Tempo: 45 minuti.** Si consegna uno zip su Classroom.

È una prova generale della verifica: stesse regole, meno cose da fare. Il comune organizza il
**Summer Sound Festival** e vuole un piccolo backend: un'**API REST** per i palchi e le esibizioni
e una **pagina web** con la scaletta di un palco. Il progetto verrà provato con dei **test automatici**:
rispettate **alla lettera** percorsi, nomi dei campi, status code e testi indicati qui sotto.

---

## 1. Requisiti tecnici

- Node.js con **Express 5** (CommonJS), database **SQLite** (`node:sqlite`, `better-sqlite3` o TypeORM),
  validazione con **zod**, pagina con **EJS**, file statici dalla cartella `public/`.
- Configurazione dalle variabili d'ambiente `PORT` (predefinita **3000**) e `API_KEY`. Nel progetto mettete un file `.env.example`:

  ```
  PORT=3000
  API_KEY=festival-chiave-2026
  ```

- **`npm install` e poi `npm start` devono bastare** per avviare il server (`start` con `node`, non con nodemon).
- **All'avvio il database si crea da solo**: tabelle e dati di esempio del file `seme.sql` (allegato)
  quando le tabelle sono vuote. Prima della correzione il file del database verrà cancellato.

## 2. I dati

| Tabella | Colonne |
|---|---|
| `palchi` | `id` (intero, chiave primaria), `nome` (testo, **unico**), `zona` (testo) |
| `esibizioni` | `id`, `artista`, `genere` (`rock`, `pop`, `elettronica` o `indie`), `slot` (intero da 1 a 12), `palco_id` → `palchi` |

Sullo stesso palco non ci possono essere due esibizioni nello stesso slot orario: la coppia (`palco_id`, `slot`) è **unica**.

## 3. L'API

**Gli errori** sono sempre JSON con il campo `errore`. Per i dati non validi (400) c'è anche `dettagli`,
con un elemento per ogni campo sbagliato:

```json
{ "errore": "Dati non validi", "dettagli": [{ "campo": "slot", "messaggio": "..." }] }
```

| Richiesta | Chiave | Risposta |
|---|:---:|---|
| `GET /api/palchi` | | 200 tutti i palchi |
| `GET /api/palchi/:id` | | 200 il palco con la `scaletta` |
| `POST /api/esibizioni` | ✔ | 201 l'esibizione creata `{ id, artista, genere, slot, palco_id }` |
| `DELETE /api/esibizioni/:id` | ✔ | 204 |

### `GET /api/palchi`

Un array con tutti i palchi **ordinati per nome**. `num_esibizioni` è il numero delle esibizioni sul palco:

```json
[ { "id": 2, "nome": "Arena Elettronica", "zona": "Parco Nord", "num_esibizioni": 2 }, ... ]
```

### `GET /api/palchi/:id`

Il palco con in più `scaletta`: le sue esibizioni **ordinate per slot**, con `id`, `artista`, `genere`, `slot`
(`[]` se non ce ne sono).

```json
{ "id": 1, "nome": "Main Stage", "zona": "Piazza Centrale", "num_esibizioni": 3,
  "scaletta": [{ "id": 2, "artista": "I Pinguini", "genere": "pop", "slot": 1 }, ...] }
```

Palco inesistente → **404**. `id` che non è un intero positivo (es. `/api/palchi/abc`) → **400**
(vale per tutte le rotte con `:id`).

### `POST /api/esibizioni` e `DELETE /api/esibizioni/:id`

- Body: `artista` (da 1 a 60 caratteri), `genere`, `slot` (intero da 1 a 12), `palco_id` (intero positivo), tutti obbligatori.
- Campi non previsti → **400**. Palco inesistente → **400** (con `dettagli` sul campo `palco_id`).
- Slot già occupato sullo stesso palco → **409** (su un altro palco va bene).
- `DELETE`: **204**; esibizione inesistente → **404**.

## 4. Sicurezza

1. **Chiave API.** Le richieste con ✔ richiedono l'header `X-Api-Key` uguale ad `API_KEY`: senza header
   o con una chiave sbagliata → **401** `{ errore }`. La chiave si legge dalla configurazione.
2. **Niente `X-Powered-By`** (`app.disable('x-powered-by')`).
3. **Errori.** Un gestore centralizzato, mai stack trace nelle risposte. JSON malformato nel body → **400**
   `{ errore }` in JSON. Rotte `/api/...` inesistenti → **404** `{ errore }` in JSON.
4. **Validazione con zod** del body e di `:id`; **query parametrizzate**; nella pagina EJS i dati si
   stampano con `<%= %>`.

## 5. La pagina web (EJS)

- **`GET /palchi/:id`**: nome e zona del palco e la scaletta ordinata per slot (slot, artista,
  genere). Se il palco non ha esibizioni, il testo **`Nessuna esibizione programmata`**.
- Palco inesistente → **404** con una pagina HTML che contiene il testo **`Palco non trovato`**.
- Un foglio di stile `public/stile.css`, servito all'indirizzo `/stile.css` e collegato nella pagina.

## 6. Consegna

Uno zip della cartella del progetto chiamato **`cognome-nome.zip`**, **senza `node_modules`** e senza il
file del database, con dentro `package.json`, `.env.example` e tutto il codice.

## 7. Valutazione

| Parte | Punti |
|---|---:|
| Palchi (elenco e dettaglio con la scaletta) | 25 |
| Esibizioni (aggiunta ed eliminazione) | 30 |
| Validazione ed errori | 20 |
| Sicurezza | 10 |
| Pagina EJS | 15 |

---

## Allegato: `seme.sql`

```sql
INSERT INTO palchi (id, nome, zona) VALUES
  (1, 'Main Stage',        'Piazza Centrale'),
  (2, 'Arena Elettronica', 'Parco Nord'),
  (3, 'Palco Acustico',    'Giardini'),
  (4, 'Underground Club',  'Ex Mattatoio');

INSERT INTO esibizioni (id, artista, genere, slot, palco_id) VALUES
  (1, 'The Rockers',   'rock',        3, 1),
  (2, 'I Pinguini',    'pop',         1, 1),
  (3, 'Nuova Onda',    'indie',       2, 1),
  (4, 'DJ Matrix',     'elettronica', 1, 2),
  (5, 'Synth Wave',    'elettronica', 4, 2),
  (6, 'Solo Chitarra', 'indie',       2, 3);
```