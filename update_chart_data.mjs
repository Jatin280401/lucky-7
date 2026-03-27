import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY; // Or service key if available, but anon key with table editor might work or we can check. Wait, RLS might block anon key from updating.

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function updateChartData() {
  console.log("Fetching cities...");
  const { data: cities, error: fetchError } = await supabase
    .from('cities')
    .select('id, name, chart_data');

  if (fetchError) {
    console.error("Error fetching cities:", fetchError);
    return;
  }

  console.log(`Found ${cities.length} cities. Updating chart_data...`);

  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

  for (const city of cities) {
    let currentData = city.chart_data || {};
    let updatedData = { ...currentData };

    for (const month of months) {
      if (!updatedData[month] || !Array.isArray(updatedData[month])) {
        updatedData[month] = Array(31).fill("");
      } else {
        // Pad to 31 if it exists but is shorter
        const arr = [...updatedData[month]];
        while (arr.length < 31) {
          arr.push("");
        }
        updatedData[month] = arr;
      }
    }

    const { error: updateError } = await supabase
      .from('cities')
      .update({ chart_data: updatedData })
      .eq('id', city.id);

    if (updateError) {
      console.error(`Error updating city ${city.name} (${city.id}):`, updateError);
    } else {
      console.log(`Updated city: ${city.name}`);
    }
  }

  console.log("Finished updating chart data.");
}

updateChartData();
