# 🍺 La Pulquería - Dashboard Financiero 2025

Dashboard ejecutivo interactivo con **vista anual consolidada** y **análisis mensual detallado** para cada uno de los 11 meses del año.

![Dashboard Preview](docs/preview.png)

## 🎯 Características

### Navegación Integrada
- **Vista Anual**: Consolidado de Enero a Noviembre 2025
- **Vista Mensual**: Selecciona cualquier mes desde el menú desplegable
- **Cambio instantáneo** entre vistas sin perder contexto

### Secciones del Dashboard
1. **Resumen** - KPIs principales, gráficos de evolución, distribución de pagos
2. **Costos** - Estructura detallada de costos operativos con análisis de cerveza
3. **Tendencias** - Evolución mensual, tabla comparativa interactiva
4. **Insights** - Alertas, fortalezas y recomendaciones estratégicas

## 📊 Métricas Principales (YTD)

| Indicador | Valor | % s/Ventas |
|-----------|-------|------------|
| **Ventas Totales** | $12,627,852 MXN | 100% |
| **EBITDA** | $2,940,071 MXN | 23.3% |
| **Margen Bruto** | 62.9% | — |
| **Costos Operativos** | $8,481,386 MXN | 67.2% |

## 🚀 Tecnologías

- **React 18** - Framework UI
- **Recharts** - Visualizaciones interactivas
- **Tailwind CSS** - Estilos utility-first
- **Lucide React** - Iconografía
- **Vite** - Build tool ultrarrápido

## 📦 Instalación

```bash
# Clonar repositorio
git clone https://github.com/TU_USUARIO/pulqueria-dashboard-2025.git

# Instalar dependencias
cd pulqueria-dashboard-2025
npm install

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build
```

## 🗂️ Estructura del Proyecto

```
pulqueria-dashboard-2025/
├── src/
│   ├── Dashboard.jsx    # Componente principal (vista anual + mensual)
│   ├── main.jsx         # Entry point
│   └── index.css        # Estilos globales + Tailwind
├── public/
│   └── favicon.svg
├── docs/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 📈 Datos por Mes

| Mes | Ventas | Utilidad | Margen |
|-----|--------|----------|--------|
| Enero | $248K | -$90K | -36.4% |
| Febrero | $281K | -$28K | -9.9% |
| Marzo | $1.23M | $351K | 28.5% |
| Abril | $1.16M | $215K | 18.5% |
| Mayo | $1.39M | $390K | 28.0% |
| Junio | $1.18M | $290K | 24.5% |
| Julio | $1.30M | $286K | 21.9% |
| **Agosto** | **$1.65M** | **$535K** | **32.4%** |
| Septiembre | $1.38M | $301K | 21.8% |
| Octubre | $1.31M | $327K | 25.1% |
| Noviembre | $1.49M | $370K | 24.9% |

## 🔍 Funcionalidades Clave

### Menú de Navegación
- Desplegable con todos los meses disponibles
- Indicador visual de utilidad por mes (verde/rojo)
- Vista anual siempre accesible

### Tabla Comparativa Interactiva
- Click en cualquier fila para ir al mes seleccionado
- Resaltado del mes actual
- Totales anuales en footer

### Análisis Contextual
- Ranking automático del mes seleccionado
- Comparación vs mes anterior
- Alertas dinámicas según el período

## 🎯 Insights Clave

### ⚠️ Alertas
- Cerveza representa ~40% de costos operativos
- Enero y Febrero en números rojos
- Algunos meses con costos creciendo más que ventas

### ✅ Fortalezas  
- Margen bruto sólido (62.9%)
- Agosto: mejor mes del año
- EBITDA de 23.3% competitivo

## 📋 Uso

1. **Selecciona período**: Usa el menú desplegable en el header
2. **Navega secciones**: Resumen, Costos, Tendencias, Insights
3. **Explora datos**: Click en la tabla para cambiar de mes
4. **Analiza insights**: Alertas y recomendaciones contextuales

---

*Dashboard generado con datos reales del Estado de Resultados 2025*

## 📄 Licencia

Proyecto privado - Uso interno exclusivo.
