import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing credentials");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const monthsInitial = {
  "JAN": Array(31).fill(""),
  "FEB": Array(31).fill(""),
  "MAR": Array(31).fill(""),
  "APR": Array(31).fill(""),
  "MAY": Array(31).fill(""),
  "JUN": Array(31).fill(""),
  "JUL": Array(31).fill(""),
  "AUG": Array(31).fill(""),
  "SEP": Array(31).fill(""),
  "OCT": Array(31).fill(""),
  "NOV": Array(31).fill(""),
  "DEC": Array(31).fill("")
};

const newCities = [
  { id: "1", name: "DELHI BAZAR", timing: "3:00 PM", yesterdayResult: "75", todayResult: "74", slug: "delhi-bazar", group: "main", order: 1 },
  { id: "2", name: "SADAR BAZAR", timing: "4:40 PM", yesterdayResult: "42", todayResult: "27", slug: "sadar-bazar", group: "main", order: 2 },
  { id: "3", name: "FARIDABAD", timing: "6:10 PM", yesterdayResult: "43", todayResult: "", slug: "faridabad", group: "main", order: 3 },
  { id: "4", name: "GAJIYABAD", timing: "9:30 PM", yesterdayResult: "34", todayResult: "", slug: "gajiyabad", group: "main", order: 4 },
  { id: "5", name: "GALI", timing: "11:30 PM", yesterdayResult: "68", todayResult: "", slug: "gali", group: "main", order: 5 },
  { id: "6", name: "DISAWAR", timing: "5:15 AM", yesterdayResult: "92", todayResult: "26", slug: "disawar", group: "main", order: 6 },
  
  { id: "7", name: "FARUKH NAGAR", timing: "12:30 PM", yesterdayResult: "24", todayResult: "84", slug: "farukh-nagar", group: "secondary", order: 1 },
  { id: "8", name: "SUNTANPUR", timing: "1:20 PM", yesterdayResult: "91", todayResult: "", slug: "suntanpur", group: "secondary", order: 2 },
  { id: "9", name: "SADAR BAZAR", timing: "1:40 PM", yesterdayResult: "82", todayResult: "59", slug: "sadar-bazar-day", group: "secondary", order: 3 },
  { id: "10", name: "URYAPUR", timing: "2:30 PM", yesterdayResult: "58", todayResult: "35", slug: "uryapur", group: "secondary", order: 4 },
  { id: "11", name: "GWALIOR", timing: "2:40 PM", yesterdayResult: "62", todayResult: "02", slug: "gwalior", group: "secondary", order: 5 },
  { id: "12", name: "DELHI MATKA", timing: "3:40 PM", yesterdayResult: "24", todayResult: "18", slug: "delhi-matka", group: "secondary", order: 6 },
  { id: "13", name: "MIRJAPUR", timing: "5:30 PM", yesterdayResult: "94", todayResult: "14", slug: "mirjapur", group: "secondary", order: 7 },
  { id: "14", name: "AGRA", timing: "5:30 PM", yesterdayResult: "29", todayResult: "89", slug: "agra", group: "secondary", order: 8 },
  { id: "15", name: "BHADURGHAD", timing: "7:30 PM", yesterdayResult: "82", todayResult: "", slug: "bhadurghad", group: "secondary", order: 9 },
  { id: "16", name: "ALWAR", timing: "7:35 PM", yesterdayResult: "83", todayResult: "", slug: "alwar", group: "secondary", order: 10 },
  { id: "17", name: "DLF CITY", timing: "10:30 PM", yesterdayResult: "61", todayResult: "", slug: "dlf-city", group: "secondary", order: 11 },
  { id: "18", name: "DWARIKA", timing: "10:35 PM", yesterdayResult: "62", todayResult: "", slug: "dwarika", group: "secondary", order: 12 },
  { 
    id: "system-date-tracker", 
    name: "System Date Tracker", 
    timing: `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}`, 
    yesterdayResult: "", 
    todayResult: "", 
    slug: "system-date-tracker", 
    group: "main", 
    order: 999 
  }
];

async function resetDB() {
  console.log("Deleting existing cities...");
  const { error: delError } = await supabase.from('cities').delete().neq('id', 'dummy');
  if (delError) {
    console.error("Failed to delete cities:", delError);
    return;
  }
  
  const insertData = newCities.map(c => ({
    ...c,
    chart_data: monthsInitial
  }));
  
  console.log("Inserting new exact cities...");
  const { error: insError } = await supabase.from('cities').insert(insertData);
  if (insError) {
    console.error("Failed to insert cities:", insError);
  } else {
    console.log("Successfully recreated exact cities in DB with full chart_data.");
  }
}

resetDB();
