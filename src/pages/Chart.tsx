import Navbar from "@/components/Navbar";
import MarqueeBar from "@/components/MarqueeBar";
import Footer from "@/components/Footer";
import { useData } from "@/hooks/useData";

// Gradient presets that cycle through cards for visual variety
const gradients = [
  "linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF8C00 100%)",
  "linear-gradient(135deg, #FFEC3D 0%, #FFD700 50%, #F0A500 100%)",
  "linear-gradient(135deg, #FFC107 0%, #FF9800 50%, #F57C00 100%)",
  "linear-gradient(135deg, #FFE44D 0%, #FFB300 50%, #FF8F00 100%)",
  "linear-gradient(135deg, #FFD54F 0%, #FFCA28 50%, #FFA000 100%)",
  "linear-gradient(135deg, #FFEB3B 0%, #FFC107 50%, #FF9800 100%)",
  "linear-gradient(135deg, #FFE082 0%, #FFD54F 50%, #FFB300 100%)",
  "linear-gradient(135deg, #FDD835 0%, #F9A825 50%, #F57F17 100%)",
];

const Chart = () => {
  const { cities } = useData();

  const allCities = [...cities]
    .filter((c) => c.id !== "system-date-tracker")
    .sort((a, b) => a.order - b.order);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <MarqueeBar />
      {/* City chart cards grid */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "32px 16px 48px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
          }}
          className="chart-cards-grid"
        >
          {allCities.map((city, index) => (
            <div
              key={city.id}
              style={{
                background: gradients[index % gradients.length],
                borderRadius: "18px",
                padding: "36px 24px 28px",
                position: "relative",
                overflow: "hidden",
                minHeight: "170px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                cursor: "pointer",
              }}
              className="chart-card"
              onClick={() => (window.location.href = `/chart/${city.slug}`)}
            >
              {/* Decorative circles */}
              <div
                style={{
                  position: "absolute",
                  bottom: "-20px",
                  left: "-20px",
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  border: "2px solid rgba(0,0,0,0.08)",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "-20px",
                  right: "-20px",
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  border: "2px solid rgba(0,0,0,0.08)",
                  pointerEvents: "none",
                }}
              />

              {/* City Name */}
              <h3
                style={{
                  color: "#000",
                  fontSize: "22px",
                  fontWeight: 900,
                  textTransform: "uppercase",
                  letterSpacing: "1.5px",
                  textAlign: "center",
                  marginBottom: "4px",
                  textShadow: "none",
                  lineHeight: 1.2,
                }}
              >
                {city.name}
              </h3>

              {/* Yearly Chart subtitle */}
              <p
                style={{
                  color: "#000",
                  fontSize: "13px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  textAlign: "center",
                  marginBottom: "16px",
                  opacity: 0.95,
                }}
              >
                YEARLY CHART 2026
              </p>

              {/* View Chart Link */}
              <a
                href={`/chart/${city.slug}`}
                style={{
                  color: "#000",
                  fontSize: "13px",
                  fontWeight: 600,
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  opacity: 0.9,
                  transition: "opacity 0.2s ease",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                View Chart <span style={{ fontSize: "16px" }}>→</span>
              </a>
            </div>
          ))}
        </div>
      </div>

      <Footer />

      <style>{`
        .chart-card:hover {
          transform: translateY(-4px) !important;
          box-shadow: 0 16px 48px rgba(0,0,0,0.2) !important;
        }
        
        @media (max-width: 1024px) {
          .chart-cards-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        
        @media (max-width: 640px) {
          .chart-cards-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 12px !important;
          }
          .chart-card {
            min-height: 140px !important;
            padding: 24px 16px 20px !important;
          }
          .chart-card h3 {
            font-size: 16px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Chart;
