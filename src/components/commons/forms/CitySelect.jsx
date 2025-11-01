import React, { useState, useEffect } from "react";
import { Select, Spinner, Box, Text } from "@chakra-ui/react";

/**
 * Props:
 * - name: string (nombre del campo, p.ej. "city")
 * - value: string
 * - onChange: function (recibe un event-like: { target: { name, value } })
 * - placeholder: string
 */
export default function CitySelect({
  name = "city",
  value = "",
  onChange,
  placeholder = "Seleccioná una ciudad (Provincia de Buenos Aires)",
  error, 
}) {
  const [cities, setCities] = useState(null); // null = not fetched yet
  const [loading, setLoading] = useState(false);
  const CACHE_KEY = "georef_localidades_buenos_aires_v1";

  useEffect(() => {
    const raw = localStorage.getItem(CACHE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCities(parsed);
          return;
        }
      } catch (err) {}
    }
  }, []);

  const handleFocus = async () => {
    if (cities !== null) return;
    setLoading(true);
    try {
      const provRes = await fetch(
        "https://apis.datos.gob.ar/georef/api/provincias?campos=id,nombre"
      );
      const provJson = await provRes.json();
      const provincias = provJson.provincias || [];

      const provBA =
        provincias.find((p) => p.nombre === "Buenos Aires") ||
        provincias.find((p) =>
          p.nombre?.toLowerCase().includes("buenos aires") ? p : null
        );

      if (!provBA) {
        console.warn("No se encontró la provincia 'Buenos Aires' en Georef.");
        setCities([]);
        localStorage.setItem(CACHE_KEY, JSON.stringify([]));
        setLoading(false);
        return;
      }

      const provinciaId = provBA.id;

      const localidadesRes = await fetch(
        `https://apis.datos.gob.ar/georef/api/localidades?provincia=${provinciaId}&campos=id,nombre&max=1000`
      );
      const localidadesJson = await localidadesRes.json();
      const localidades = localidadesJson.localidades || [];

      const list = localidades
        .map((l) => ({ id: l.id, nombre: l.nombre }))
        .sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));

      setCities(list);
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(list));
      } catch (err) {
        // storage full, ignore
      }
    } catch (err) {
      console.error("Error cargando localidades:", err);
      setCities([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    if (!onChange) return;
    onChange({ target: { name, value: e.target.value } });
  };

  return (
    <Box>
      <Select
        name={name}
        value={value || ""}
        placeholder={placeholder}
        onChange={handleChange}
        onFocus={handleFocus}
        isDisabled={loading || (cities === null && false)}
      >
        {loading && (
          <option value="" disabled>
            Cargando...
          </option>
        )}
        {Array.isArray(cities) &&
          cities.map((c) => (
            <option key={c.id} value={c.nombre}>
              {c.nombre}
            </option>
          ))}
      </Select>

      {loading && (
        <Box mt={2} display="flex" alignItems="center">
          <Spinner size="sm" mr={2} />
          <Text fontSize="sm" color="gray.500">
            Cargando ciudades de Provincia de Buenos Aires...
          </Text>
        </Box>
      )}
      {error && (
        <Text color="red.500" fontSize="sm">
          {error}
        </Text>
      )}
    </Box>
  );
}
