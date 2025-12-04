# 🍺 La Pulquería - Dashboard Financiero 2025

Dashboard ejecutivo interactivo con **vista general (YTD)** y **navegación por meses** para análisis financiero y toma de decisiones.

![Dashboard Preview](docs/preview.png)

## ✨ Características

### 🔄 Navegación Dinámica
- **Vista General (YTD)**: Métricas acumuladas Enero-Noviembre 2025
- **Vista por Mes**: Selecciona cualquier mes para ver su detalle
- **Menú desplegable** con utilidad de cada mes para referencia rápida

### 📊 Métricas Incluidas
- Ventas totales y por método de pago (efectivo/tarjeta)
- Costos operativos con desglose detallado
- Utilidad operativa y márgenes
- Comparativas vs mes anterior (variaciones %)
- Ranking mensual dentro del año
- Estructura de costos (pie chart interactivo)

### 📈 Visualizaciones
- KPIs principales con tendencias
- Gráfico de tendencia anual (ventas vs utilidad)
- Estructura de costos operativos
- Distribución de ventas por método de pago
- Margen operativo por mes
- Insights y alertas automáticas

## 📋 Métricas 2025 (YTD)

| Indicador | Valor |
|-----------|-------|
| **Ventas Totales** | $12,627,852 MXN |
| **Utilidad Operativa** | $2,940,071 MXN |
| **Margen Operativo** | 23.3% |
| **Margen Bruto** | 60.9% |

## 🚀 Instalación

```bash
# Clonar repositorio
git clone https://github.com/TU_USUARIO/pulqueria-dashboard-2025.git
cd pulqueria-dashboard-2025

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build
```

## 🛠️ Tecnologías

- **React 18** - UI Framework
- **Recharts** - Visualizaciones interactivas
- **Tailwind CSS** - Estilos responsivos
- **Lucide React** - Iconografía
- **Vite** - Build tool ultrarrápido

## 📁 Estructura

```
pulqueria-dashboard-2025/
├── src/
│   ├── DashboardUnificado.jsx  # Componente principal
│   ├── main.jsx                 # Entry point
│   └── index.css                # Estilos globales
├── public/
│   └── favicon.svg
├── docs/
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🎯 Uso

1. **Vista General**: Muestra métricas acumuladas del año
2. **Selector de Mes**: Click en el menú superior derecho
3. **Comparativas**: Automáticamente muestra variación vs mes anterior
4. **Ranking**: En vista mensual, muestra posición en el año

## 📊 Datos Incluidos

- 11 meses de operación (Enero - Noviembre 2025)
- 19+ categorías de costos operativos
- Gastos administrativos detallados
- Otros gastos (jurídicos, comisiones bancarias, etc.)
- Métricas calculadas (COGS, márgenes, variaciones)

## 🔍 Insights Automáticos

El dashboard genera automáticamente:
- ⚠️ Alertas sobre áreas de atención
- ✅ Fortalezas identificadas
- 📊 Comparativas contextuales
- 🎯 Rankings de desempeño

---

*Desarrollado para La Pulquería - Dashboard de Business Intelligence*

## 📄 Licencia

Proyecto privado - Uso interno exclusivo.
