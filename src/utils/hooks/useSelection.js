import React, { useEffect, useState, useCallback } from "react";
import { Checkbox } from "@chakra-ui/react";

/**
 * useSelection
 * @param {Array} items - row array (p. ej. products)
 * @param {Object} opts - { rowKey: 'id', onChange: fn(selectedArray) }
 */
export function useSelection(items = [], opts = {}) {
  const { rowKey = "id", onChange } = opts;
  const [selectedSet, setSelectedSet] = useState(() => new Set());

  useEffect(() => {
    if (!items || items.length === 0) {
      setSelectedSet(new Set());
      if (onChange) onChange([]);
      return;
    }
    setSelectedSet((prev) => {
      const next = new Set();
      const ids = new Set(items.map((r) => String(r[rowKey])));
      for (const id of prev) if (ids.has(String(id))) next.add(id);
      const arr = Array.from(next);
      if (onChange) onChange(arr);
      return next;
    });
  }, [items, rowKey, onChange]);

  const isSelected = useCallback(
    (id) => selectedSet.has(String(id)),
    [selectedSet]
  );

  const toggleOne = useCallback(
    (id) =>
      setSelectedSet((prev) => {
        const next = new Set(prev);
        const sid = String(id);
        if (next.has(sid)) next.delete(sid);
        else next.add(sid);
        const arr = Array.from(next);
        if (onChange) onChange(arr);
        return next;
      }),
    [onChange]
  );

  const selectAll = useCallback(() => {
    setSelectedSet(new Set(items.map((r) => String(r[rowKey]))));
    if (onChange) onChange(items.map((r) => String(r[rowKey])));
  }, [items, rowKey, onChange]);

  const clear = useCallback(() => {
    setSelectedSet(new Set());
    if (onChange) onChange([]);
  }, [onChange]);

  const unselectAll = useCallback(() => {
    clear();
  }, [clear]);

  const selectedArray = Array.from(selectedSet);
  const count = selectedSet.size;
  const allCount = items ? items.length : 0;
  const isAllSelected = allCount > 0 && count === allCount;
  const isSomeSelected = count > 0 && count < allCount;

  return {
    selectedSet,
    selectedArray,
    isSelected,
    toggleOne,
    selectAll,
    unselectAll,
    clear,
    isAllSelected,
    isSomeSelected,
    count,
    allCount,
  };
}

/**
 * makeSelectColumn
 * Devuelve la definición de columna para usar en tu DataTable.
 * @param {Object} args
 *   - selection: el objeto retornado por useSelection (requerido)
 *   - rowKey: clave del id dentro de cada row (por defecto 'id')
 *   - ariaLabelPrefix: texto para aria-labels (opcional)
 */
export function makeSelectColumn({
  selection,
  rowKey = "id",
  ariaLabelPrefix = "",
}) {
  if (!selection) {
    throw new Error(
      "makeSelectColumn:  The `selection` object is required(useSelection)"
    );
  }

  const { isAllSelected, isSomeSelected, selectAll, toggleOne, isSelected, unselectAll } =
    selection;

  return {
    key: "select",
    header: (
      <Checkbox
        isChecked={isAllSelected}
        isIndeterminate={isSomeSelected}
        onChange={() => {
          if (isAllSelected) unselectAll();
          else selectAll();
        }}
        borderColor={"blue.300"}
        aria-label={`${ariaLabelPrefix} seleccionar todos`}
      />
    ),
    initialWidth: 6,
    renderCell: (_, row) => {
      const id = row[rowKey];
      return (
        <Checkbox
          isChecked={isSelected(id)}
          onChange={() => toggleOne(id)}
          borderColor={"blue.300"}
          aria-label={`${ariaLabelPrefix} seleccionar ${id}`}
        />
      );
    },
  };
}
