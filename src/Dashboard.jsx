import React, { useState, useMemo } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, ComposedChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Percent, CreditCard, Banknote, Users, Music, Beer, Calendar, ChevronDown, ArrowUpRight, ArrowDownRight, Target, Zap, AlertTriangle, CheckCircle, BarChart3, PieChart as PieChartIcon, Home } from 'lucide-react';

// ══════════════════════════════════════════════════════════════════════════════
// DATOS REALES - ESTADO DE RESULTADOS 2025 - LA PULQUERÍA
// ══════════════════════════════════════════════════════════════════════════════

const DATOS_MENSUALES = [
  { mes: 'Enero', mes_corto: 'ENE', ventas: 248449.7, efectivo: 88898.34, tarjeta: 100685, descuentos: 202.86, costos_operativos: 270590.66, gastos_admin: 39001.99, otros_gastos: 29342.63, utilidad_operativa: -90485.57, cerveza_liquido: 66014.57, nomina: 45657, comision_personal: 13842.8, musica_entretenimiento: 13500, prestaciones_ley: 62969.09, alimentos: 13479.71, ultra_5pct: 12422.49, barra_insumos: 9792.32, destilados: 2632.63, cerveza_logistico: 8800, refresco: 1268, cogs: 104617.40, margen_bruto: 143832.31 },
  { mes: 'Febrero', mes_corto: 'FEB', ventas: 280544.12, efectivo: 149688.62, tarjeta: 86787, descuentos: 922.17, costos_operativos: 251798.60, gastos_admin: 46224.80, otros_gastos: 10257.95, utilidad_operativa: -27737.23, cerveza_liquido: 81591.62, nomina: 46407.9, comision_personal: 16191.45, musica_entretenimiento: 12000, prestaciones_ley: 36800, alimentos: 8986.5, ultra_5pct: 14027.21, barra_insumos: 9748.36, destilados: 6542.09, cerveza_logistico: 0, refresco: 3818, cogs: 114965.42, margen_bruto: 165578.70 },
  { mes: 'Marzo', mes_corto: 'MAR', ventas: 1232646.03, efectivo: 609908.68, tarjeta: 446446, descuentos: 2324.8, costos_operativos: 767580.12, gastos_admin: 80672.70, otros_gastos: 33470.57, utilidad_operativa: 350922.64, cerveza_liquido: 235859.65, nomina: 125580.07, comision_personal: 73801.61, musica_entretenimiento: 63000, prestaciones_ley: 34500, alimentos: 37868.63, ultra_5pct: 61632.30, barra_insumos: 45664.94, destilados: 12030.87, cerveza_logistico: 21628, refresco: 11901.05, cogs: 380920.50, margen_bruto: 851725.53 },
  { mes: 'Abril', mes_corto: 'ABR', ventas: 1159801.51, efectivo: 563053.04, tarjeta: 452520, descuentos: 5546.97, costos_operativos: 836598.54, gastos_admin: 80628.46, otros_gastos: 27806.57, utilidad_operativa: 214767.94, cerveza_liquido: 341648.16, nomina: 115860.90, comision_personal: 77020.02, musica_entretenimiento: 50500, prestaciones_ley: 36800, alimentos: 42009.38, ultra_5pct: 57990.08, barra_insumos: 35451.61, destilados: 19180.98, cerveza_logistico: 25573, refresco: 8304.03, cogs: 494705.63, margen_bruto: 665095.88 },
  { mes: 'Mayo', mes_corto: 'MAY', ventas: 1391362, efectivo: 679208.75, tarjeta: 524275, descuentos: 5045.69, costos_operativos: 886498.78, gastos_admin: 82524.27, otros_gastos: 32146.15, utilidad_operativa: 390192.81, cerveza_liquido: 338903.38, nomina: 114237.25, comision_personal: 75840.14, musica_entretenimiento: 79500, prestaciones_ley: 36800, alimentos: 53792.63, ultra_5pct: 69568.1, barra_insumos: 41263.76, destilados: 17781.3, cerveza_logistico: 16720, refresco: 17686.86, cogs: 514452.27, margen_bruto: 876909.73 },
  { mes: 'Junio', mes_corto: 'JUN', ventas: 1181757.81, efectivo: 538298.59, tarjeta: 463914, descuentos: 14713.1, costos_operativos: 783908.40, gastos_admin: 78711.33, otros_gastos: 29183.12, utilidad_operativa: 289954.96, cerveza_liquido: 305506.65, nomina: 105810.58, comision_personal: 69073.44, musica_entretenimiento: 71700, prestaciones_ley: 36800, alimentos: 45194.66, ultra_5pct: 59087.89, barra_insumos: 17926.08, destilados: 17569.95, cerveza_logistico: 16720, refresco: 15859.76, cogs: 459938.91, margen_bruto: 721818.90 },
  { mes: 'Julio', mes_corto: 'JUL', ventas: 1304230.24, efectivo: 588098.9, tarjeta: 512366, descuentos: 12245.72, costos_operativos: 901489.78, gastos_admin: 82676.24, otros_gastos: 34326.64, utilidad_operativa: 285737.58, cerveza_liquido: 360655.29, nomina: 117370.91, comision_personal: 77970.49, musica_entretenimiento: 80200, prestaciones_ley: 43700, alimentos: 44059.51, ultra_5pct: 65211.51, barra_insumos: 24485.34, destilados: 25399.38, cerveza_logistico: 20196, refresco: 17405.06, cogs: 532926.75, margen_bruto: 771303.49 },
  { mes: 'Agosto', mes_corto: 'AGO', ventas: 1652549.58, efectivo: 790013.94, tarjeta: 681261.84, descuentos: 8692.58, costos_operativos: 1005015.85, gastos_admin: 72420.91, otros_gastos: 40058.68, utilidad_operativa: 535054.15, cerveza_liquido: 423176.1, nomina: 119763.22, comision_personal: 92919.22, musica_entretenimiento: 72400, prestaciones_ley: 43700, alimentos: 57472.09, ultra_5pct: 82627.48, barra_insumos: 26040.16, destilados: 21763.15, cerveza_logistico: 22836, refresco: 19706.02, cogs: 627580.84, margen_bruto: 1024968.74 },
  { mes: 'Septiembre', mes_corto: 'SEP', ventas: 1381195.86, efectivo: 641004.53, tarjeta: 567090.03, descuentos: 11324.18, costos_operativos: 957036.91, gastos_admin: 85573.89, otros_gastos: 37796.66, utilidad_operativa: 300788.39, cerveza_liquido: 422153.22, nomina: 126596.39, comision_personal: 82051.03, musica_entretenimiento: 59600, prestaciones_ley: 43700, alimentos: 33910.86, ultra_5pct: 69059.79, barra_insumos: 22572.72, destilados: 30159.27, cerveza_logistico: 19360, refresco: 22926.71, cogs: 597569.85, margen_bruto: 783626.01 },
  { mes: 'Octubre', mes_corto: 'OCT', ventas: 1305242.56, efectivo: 565935.64, tarjeta: 579845, descuentos: 8635.92, costos_operativos: 839611.57, gastos_admin: 82284.61, otros_gastos: 56179.20, utilidad_operativa: 327167.19, cerveza_liquido: 328522.68, nomina: 121775.21, comision_personal: 77600.27, musica_entretenimiento: 56889, prestaciones_ley: 29900, alimentos: 38571.14, ultra_5pct: 65262.13, barra_insumos: 27400.7, destilados: 26917.53, cerveza_logistico: 16632, refresco: 20642, cogs: 496547.48, margen_bruto: 808695.08 },
  { mes: 'Noviembre', mes_corto: 'NOV', ventas: 1490072.62, efectivo: 636482.39, tarjeta: 660592.01, descuentos: 9304.58, costos_operativos: 980619.15, gastos_admin: 88021.00, otros_gastos: 50998.27, utilidad_operativa: 370434.19, cerveza_liquido: 430600.74, nomina: 120070.58, comision_personal: 87971.59, musica_entretenimiento: 74400, prestaciones_ley: 29900, alimentos: 39573.09, ultra_5pct: 74503.63, barra_insumos: 24824.82, destilados: 29290.68, cerveza_logistico: 23936, refresco: 20414.31, cogs: 618318.45, margen_bruto: 871754.17 },
];

const TOTALES_ANUALES = {
  ventas: 12627852.03,
  efectivo: 5850591.42,
  tarjeta: 5075781.88,
  descuentos: 78958.57,
  costos_operativos: 8481386.35,
  gastos_admin: 818740.20,
  otros_gastos: 387654.72,
  utilidad_operativa: 2940070.76,
  cogs: 4679525.43,
  margen_bruto: 7948326.60,
  cerveza_liquido: 3334632.06,
  nomina: 1159129.99,
  comision_personal: 744282.06,
  musica_entretenimiento: 633689,
  prestaciones_ley: 435569.09,
  alimentos: 414918.20,
};

// ══════════════════════════════════════════════════════════════════════════════
// COMPONENTE PRINCIPAL
// ══════════════════════════════════════════════════════════════════════════════

const Dashboard = () => {
  const [vista, setVista] = useState('anual'); // 'anual' o índice del mes (0-10)
  const [seccion, setSeccion] = useState('resumen');
  const [menuOpen, setMenuOpen] = useState(false);

  // Datos actuales según la vista
  const datosActuales = useMemo(() => {
    if (vista === 'anual') {
      return {
        tipo: 'anual',
        titulo: 'Anual 2025',
        subtitulo: 'Enero - Noviembre',
        ...TOTALES_ANUALES,
        promedio_ventas: TOTALES_ANUALES.ventas / 11,
        promedio_utilidad: TOTALES_ANUALES.utilidad_operativa / 11,
      };
    } else {
      const mes = DATOS_MENSUALES[vista];
      const mesAnterior = vista > 0 ? DATOS_MENSUALES[vista - 1] : null;
      return {
        tipo: 'mensual',
        titulo: mes.mes,
        subtitulo: '2025',
        ...mes,
        mesAnterior,
        variacion_ventas: mesAnterior ? ((mes.ventas - mesAnterior.ventas) / mesAnterior.ventas * 100) : null,
        variacion_costos: mesAnterior ? ((mes.costos_operativos - mesAnterior.costos_operativos) / mesAnterior.costos_operativos * 100) : null,
        variacion_utilidad: mesAnterior && mesAnterior.utilidad_operativa !== 0 ? ((mes.utilidad_operativa - mesAnterior.utilidad_operativa) / Math.abs(mesAnterior.utilidad_operativa) * 100) : null,
      };
    }
  }, [vista]);

  // Colores
  const COLORS = {
    primary: '#0f172a',
    accent: '#8b5cf6',
    success: '#22c55e',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#3b82f6',
  };

  const PIE_COLORS = ['#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe', '#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#ec4899', '#14b8a6', '#64748b'];

  // Formateo
  const formatCurrency = (value) => {
    if (Math.abs(value) >= 1000000) return `$${(value / 1000000).toFixed(2)}M`;
    if (Math.abs(value) >= 1000) return `$${(value / 1000).toFixed(0)}K`;
    return `$${value.toFixed(0)}`;
  };

  const formatFullCurrency = (value) => {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: 0 }).format(value);
  };

  // Componente KPI Card
  const KPICard = ({ title, value, subtitle, trend, trendLabel, icon: Icon, color = 'violet' }) => (
    <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/90 rounded-2xl p-5 border border-slate-700/50 hover:border-violet-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/10">
      <div className="flex justify-between items-start mb-2">
        <span className="text-slate-400 text-xs font-medium tracking-wider uppercase">{title}</span>
        {Icon && <Icon className="w-5 h-5 text-violet-400" />}
      </div>
      <div className="text-2xl md:text-3xl font-bold text-white">{value}</div>
      {subtitle && <div className="text-slate-400 text-sm mt-1">{subtitle}</div>}
      {trend !== null && trend !== undefined && (
        <div className={`flex items-center mt-2 text-xs ${trend >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
          {trend >= 0 ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
          <span>{trend >= 0 ? '+' : ''}{trend.toFixed(1)}% {trendLabel || ''}</span>
        </div>
      )}
    </div>
  );

  // Tooltip personalizado
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 border border-slate-600 rounded-lg p-3 shadow-xl">
          <p className="text-slate-300 font-medium mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {formatFullCurrency(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Datos para gráficos
  const chartData = DATOS_MENSUALES.map(m => ({
    mes: m.mes_corto,
    ventas: m.ventas,
    costos: m.costos_operativos,
    utilidad: m.utilidad_operativa,
    margen: (m.utilidad_operativa / m.ventas * 100).toFixed(1),
  }));

  // Estructura de costos para el mes/año actual
  const costosData = vista === 'anual' ? [
    { name: 'Cerveza (líquido)', value: TOTALES_ANUALES.cerveza_liquido },
    { name: 'Nómina', value: TOTALES_ANUALES.nomina },
    { name: 'Comisiones', value: TOTALES_ANUALES.comision_personal },
    { name: 'Música/Entretenimiento', value: TOTALES_ANUALES.musica_entretenimiento },
    { name: 'Prestaciones', value: TOTALES_ANUALES.prestaciones_ley },
    { name: 'Alimentos', value: TOTALES_ANUALES.alimentos },
  ] : [
    { name: 'Cerveza (líquido)', value: datosActuales.cerveza_liquido },
    { name: 'Nómina', value: datosActuales.nomina },
    { name: 'Comisiones', value: datosActuales.comision_personal },
    { name: 'Música/Entretenimiento', value: datosActuales.musica_entretenimiento },
    { name: 'Prestaciones', value: datosActuales.prestaciones_ley },
    { name: 'Alimentos', value: datosActuales.alimentos },
  ];

  // Métricas calculadas
  const metricas = {
    margenBrutoPct: (datosActuales.margen_bruto / datosActuales.ventas * 100).toFixed(1),
    margenOperativoPct: (datosActuales.utilidad_operativa / datosActuales.ventas * 100).toFixed(1),
    cogsPct: (datosActuales.cogs / datosActuales.ventas * 100).toFixed(1),
    costosVentasPct: (datosActuales.costos_operativos / datosActuales.ventas * 100).toFixed(1),
    efectivoPct: (datosActuales.efectivo / datosActuales.ventas * 100).toFixed(1),
    tarjetaPct: (datosActuales.tarjeta / datosActuales.ventas * 100).toFixed(1),
  };

  // Ranking del mes actual
  const getRanking = () => {
    if (vista === 'anual') return null;
    const sortedByVentas = [...DATOS_MENSUALES].sort((a, b) => b.ventas - a.ventas);
    const sortedByUtilidad = [...DATOS_MENSUALES].sort((a, b) => b.utilidad_operativa - a.utilidad_operativa);
    return {
      ventas: sortedByVentas.findIndex(m => m.mes === datosActuales.mes) + 1,
      utilidad: sortedByUtilidad.findIndex(m => m.mes === datosActuales.mes) + 1,
    };
  };

  const ranking = getRanking();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* HEADER CON NAVEGACIÓN */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo y título */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Beer className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                  La Pulquería
                </h1>
                <p className="text-slate-500 text-xs">Dashboard Financiero 2025</p>
              </div>
            </div>

            {/* Selector de vista */}
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 rounded-xl px-4 py-2 border border-slate-700 transition-all"
              >
                <Calendar className="w-4 h-4 text-violet-400" />
                <span className="font-medium">{datosActuales.titulo}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${menuOpen ? 'rotate-180' : ''}`} />
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-xl border border-slate-700 shadow-xl overflow-hidden">
                  <button
                    onClick={() => { setVista('anual'); setMenuOpen(false); }}
                    className={`w-full px-4 py-3 text-left hover:bg-slate-700 flex items-center gap-2 ${vista === 'anual' ? 'bg-violet-500/20 text-violet-400' : 'text-slate-300'}`}
                  >
                    <Home className="w-4 h-4" />
                    <span>Vista Anual</span>
                  </button>
                  <div className="border-t border-slate-700 my-1"></div>
                  <div className="max-h-64 overflow-y-auto">
                    {DATOS_MENSUALES.map((mes, idx) => (
                      <button
                        key={idx}
                        onClick={() => { setVista(idx); setMenuOpen(false); }}
                        className={`w-full px-4 py-2 text-left hover:bg-slate-700 flex items-center justify-between ${vista === idx ? 'bg-violet-500/20 text-violet-400' : 'text-slate-300'}`}
                      >
                        <span>{mes.mes}</span>
                        <span className={`text-xs ${mes.utilidad_operativa >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {formatCurrency(mes.utilidad_operativa)}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Tabs de sección */}
          <div className="flex gap-1 mt-3 overflow-x-auto pb-1">
            {[
              { id: 'resumen', label: 'Resumen', icon: Home },
              { id: 'costos', label: 'Costos', icon: PieChartIcon },
              { id: 'tendencias', label: 'Tendencias', icon: BarChart3 },
              { id: 'insights', label: 'Insights', icon: Zap },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSeccion(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  seccion === tab.id
                    ? 'bg-violet-500 text-white shadow-lg shadow-violet-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* CONTENIDO PRINCIPAL */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Título de sección */}
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              vista === 'anual' 
                ? 'bg-violet-500/20 text-violet-400 border border-violet-500/30' 
                : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
            }`}>
              {vista === 'anual' ? 'CONSOLIDADO ANUAL' : datosActuales.mes.toUpperCase()}
            </div>
            {ranking && (
              <div className="flex gap-2">
                <span className="px-2 py-1 rounded-full text-xs bg-emerald-500/20 text-emerald-400">
                  #{ranking.ventas} en ventas
                </span>
                <span className="px-2 py-1 rounded-full text-xs bg-blue-500/20 text-blue-400">
                  #{ranking.utilidad} en utilidad
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════════ */}
        {/* SECCIÓN: RESUMEN */}
        {/* ════════════════════════════════════════════════════════════════════ */}
        {seccion === 'resumen' && (
          <>
            {/* KPIs Principales */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <KPICard
                title={vista === 'anual' ? 'Ventas YTD' : 'Ventas del Mes'}
                value={formatCurrency(datosActuales.ventas)}
                subtitle={formatFullCurrency(datosActuales.ventas)}
                trend={datosActuales.variacion_ventas}
                trendLabel="vs mes ant."
                icon={DollarSign}
              />
              <KPICard
                title="Utilidad Operativa"
                value={formatCurrency(datosActuales.utilidad_operativa)}
                subtitle={`${metricas.margenOperativoPct}% margen`}
                trend={datosActuales.variacion_utilidad}
                trendLabel="vs mes ant."
                icon={TrendingUp}
              />
              <KPICard
                title="Margen Bruto"
                value={`${metricas.margenBrutoPct}%`}
                subtitle={formatCurrency(datosActuales.margen_bruto)}
                icon={Percent}
              />
              <KPICard
                title="Costos Operativos"
                value={formatCurrency(datosActuales.costos_operativos)}
                subtitle={`${metricas.costosVentasPct}% de ventas`}
                trend={datosActuales.variacion_costos}
                trendLabel="vs mes ant."
                icon={Target}
              />
            </div>

            {/* Gráfico principal */}
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 mb-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                {vista === 'anual' ? 'Evolución Mensual 2025' : `Comparativo: ${datosActuales.mes} en Contexto`}
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="mes" stroke="#9ca3af" />
                  <YAxis yAxisId="left" stroke="#9ca3af" tickFormatter={(v) => formatCurrency(v)} />
                  <YAxis yAxisId="right" orientation="right" stroke="#f59e0b" tickFormatter={(v) => `${v}%`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar yAxisId="left" dataKey="ventas" name="Ventas" fill="#8b5cf6" radius={[4, 4, 0, 0]} opacity={0.8} />
                  <Bar yAxisId="left" dataKey="costos" name="Costos" fill="#ef4444" radius={[4, 4, 0, 0]} opacity={0.6} />
                  <Line yAxisId="right" type="monotone" dataKey="margen" name="Margen %" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            {/* Distribución de ventas y egresos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-violet-400" />
                  Métodos de Pago
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Efectivo', value: datosActuales.efectivo },
                        { name: 'Tarjeta', value: datosActuales.tarjeta },
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      <Cell fill="#22c55e" />
                      <Cell fill="#3b82f6" />
                    </Pie>
                    <Tooltip formatter={(v) => formatFullCurrency(v)} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-6 mt-2">
                  <div className="flex items-center gap-2">
                    <Banknote className="w-4 h-4 text-emerald-400" />
                    <span className="text-slate-300 text-sm">Efectivo: {metricas.efectivoPct}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-blue-400" />
                    <span className="text-slate-300 text-sm">Tarjeta: {metricas.tarjetaPct}%</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
                <h3 className="text-lg font-semibold text-white mb-4">Estructura de Egresos</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Costos Op.', value: datosActuales.costos_operativos },
                        { name: 'Gastos Admin', value: datosActuales.gastos_admin },
                        { name: 'Otros', value: datosActuales.otros_gastos },
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      <Cell fill="#8b5cf6" />
                      <Cell fill="#f59e0b" />
                      <Cell fill="#14b8a6" />
                    </Pie>
                    <Tooltip formatter={(v) => formatFullCurrency(v)} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-3 gap-2 text-center text-xs mt-2">
                  <div><div className="w-3 h-3 rounded-full bg-violet-500 mx-auto mb-1"></div><span className="text-slate-400">Operativos</span></div>
                  <div><div className="w-3 h-3 rounded-full bg-amber-500 mx-auto mb-1"></div><span className="text-slate-400">Admin</span></div>
                  <div><div className="w-3 h-3 rounded-full bg-teal-500 mx-auto mb-1"></div><span className="text-slate-400">Otros</span></div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ════════════════════════════════════════════════════════════════════ */}
        {/* SECCIÓN: COSTOS */}
        {/* ════════════════════════════════════════════════════════════════════ */}
        {seccion === 'costos' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
                <h3 className="text-lg font-semibold text-white mb-2">Top Costos Operativos</h3>
                <p className="text-2xl font-bold text-violet-400 mb-4">{formatFullCurrency(datosActuales.costos_operativos)}</p>
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie
                      data={costosData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label={({ value }) => `${(value / datosActuales.costos_operativos * 100).toFixed(0)}%`}
                    >
                      {costosData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v) => formatFullCurrency(v)} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
                <h3 className="text-lg font-semibold text-white mb-4">Desglose Detallado</h3>
                <div className="space-y-3 max-h-[320px] overflow-y-auto">
                  {costosData.sort((a, b) => b.value - a.value).map((item, index) => (
                    <div key={index} className="flex items-center justify-between bg-slate-700/30 rounded-lg p-3">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: PIE_COLORS[index] }} />
                        <span className="text-slate-300 text-sm">{item.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-medium">{formatCurrency(item.value)}</div>
                        <div className="text-slate-500 text-xs">{(item.value / datosActuales.costos_operativos * 100).toFixed(1)}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Análisis cerveza */}
            <div className="bg-gradient-to-r from-violet-900/30 to-slate-900/50 rounded-2xl p-6 border border-violet-700/30">
              <div className="flex items-center gap-3 mb-4">
                <Beer className="w-6 h-6 text-violet-400" />
                <h3 className="text-lg font-semibold text-white">Análisis: Costo de Cerveza</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                  <div className="text-slate-400 text-sm mb-1">Costo Cerveza</div>
                  <div className="text-xl font-bold text-white">{formatCurrency(datosActuales.cerveza_liquido)}</div>
                </div>
                <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                  <div className="text-slate-400 text-sm mb-1">% de Costos Op.</div>
                  <div className="text-xl font-bold text-violet-400">{(datosActuales.cerveza_liquido / datosActuales.costos_operativos * 100).toFixed(1)}%</div>
                </div>
                <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                  <div className="text-slate-400 text-sm mb-1">% de Ventas</div>
                  <div className="text-xl font-bold text-amber-400">{(datosActuales.cerveza_liquido / datosActuales.ventas * 100).toFixed(1)}%</div>
                </div>
                <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                  <div className="text-slate-400 text-sm mb-1">Ahorro si -5%</div>
                  <div className="text-xl font-bold text-emerald-400">{formatCurrency(datosActuales.cerveza_liquido * 0.05)}</div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ════════════════════════════════════════════════════════════════════ */}
        {/* SECCIÓN: TENDENCIAS */}
        {/* ════════════════════════════════════════════════════════════════════ */}
        {seccion === 'tendencias' && (
          <>
            {/* Gráfico de tendencia */}
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 mb-6">
              <h3 className="text-lg font-semibold text-white mb-4">Tendencia de Ventas y Utilidad</h3>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="mes" stroke="#9ca3af" />
                  <YAxis yAxisId="left" stroke="#22c55e" tickFormatter={(v) => formatCurrency(v)} />
                  <YAxis yAxisId="right" orientation="right" stroke="#f59e0b" tickFormatter={(v) => formatCurrency(v)} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Area yAxisId="left" type="monotone" dataKey="ventas" name="Ventas" fill="#22c55e" fillOpacity={0.2} stroke="#22c55e" strokeWidth={2} />
                  <Line yAxisId="right" type="monotone" dataKey="utilidad" name="Utilidad" stroke="#f59e0b" strokeWidth={3} dot={{ fill: '#f59e0b', r: 5 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            {/* Tabla comparativa */}
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
              <h3 className="text-lg font-semibold text-white mb-4">Comparativo Mensual</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 px-2 text-slate-400 font-medium">Mes</th>
                      <th className="text-right py-3 px-2 text-slate-400 font-medium">Ventas</th>
                      <th className="text-right py-3 px-2 text-slate-400 font-medium">Costos</th>
                      <th className="text-right py-3 px-2 text-slate-400 font-medium">Utilidad</th>
                      <th className="text-right py-3 px-2 text-slate-400 font-medium">Margen</th>
                    </tr>
                  </thead>
                  <tbody>
                    {DATOS_MENSUALES.map((mes, i) => (
                      <tr 
                        key={i} 
                        className={`border-b border-slate-800 hover:bg-slate-700/30 cursor-pointer ${vista === i ? 'bg-violet-500/10' : ''}`}
                        onClick={() => setVista(i)}
                      >
                        <td className="py-3 px-2 text-white font-medium">{mes.mes_corto}</td>
                        <td className="py-3 px-2 text-right text-slate-300">{formatCurrency(mes.ventas)}</td>
                        <td className="py-3 px-2 text-right text-slate-300">{formatCurrency(mes.costos_operativos)}</td>
                        <td className={`py-3 px-2 text-right font-medium ${mes.utilidad_operativa >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {formatCurrency(mes.utilidad_operativa)}
                        </td>
                        <td className="py-3 px-2 text-right text-slate-400">
                          {(mes.utilidad_operativa / mes.ventas * 100).toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-violet-500/50 bg-violet-500/10">
                      <td className="py-3 px-2 text-violet-400 font-bold">TOTAL</td>
                      <td className="py-3 px-2 text-right text-white font-bold">{formatCurrency(TOTALES_ANUALES.ventas)}</td>
                      <td className="py-3 px-2 text-right text-white font-bold">{formatCurrency(TOTALES_ANUALES.costos_operativos)}</td>
                      <td className="py-3 px-2 text-right text-emerald-400 font-bold">{formatCurrency(TOTALES_ANUALES.utilidad_operativa)}</td>
                      <td className="py-3 px-2 text-right text-white font-bold">
                        {(TOTALES_ANUALES.utilidad_operativa / TOTALES_ANUALES.ventas * 100).toFixed(1)}%
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </>
        )}

        {/* ════════════════════════════════════════════════════════════════════ */}
        {/* SECCIÓN: INSIGHTS */}
        {/* ════════════════════════════════════════════════════════════════════ */}
        {seccion === 'insights' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Alertas */}
              <div className="bg-gradient-to-br from-rose-900/30 to-slate-900/50 rounded-2xl p-6 border border-rose-700/30">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="w-6 h-6 text-rose-400" />
                  <h3 className="text-lg font-semibold text-white">Áreas de Atención</h3>
                </div>
                <div className="space-y-3">
                  <div className="bg-slate-800/50 rounded-xl p-4">
                    <div className="text-rose-400 font-medium mb-1">Cerveza: {(datosActuales.cerveza_liquido / datosActuales.costos_operativos * 100).toFixed(0)}% de costos</div>
                    <p className="text-slate-400 text-sm">El costo de cerveza es el mayor gasto. Negociar mejores términos podría generar ahorros significativos.</p>
                  </div>
                  {vista !== 'anual' && datosActuales.utilidad_operativa < 0 && (
                    <div className="bg-slate-800/50 rounded-xl p-4">
                      <div className="text-rose-400 font-medium mb-1">Mes en números rojos</div>
                      <p className="text-slate-400 text-sm">Este mes tuvo pérdida operativa de {formatCurrency(Math.abs(datosActuales.utilidad_operativa))}. Revisar estrategia.</p>
                    </div>
                  )}
                  {datosActuales.variacion_costos > datosActuales.variacion_ventas && datosActuales.variacion_costos !== null && (
                    <div className="bg-slate-800/50 rounded-xl p-4">
                      <div className="text-rose-400 font-medium mb-1">Costos crecen más que ventas</div>
                      <p className="text-slate-400 text-sm">Los costos subieron {datosActuales.variacion_costos.toFixed(1)}% vs {datosActuales.variacion_ventas.toFixed(1)}% de ventas.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Fortalezas */}
              <div className="bg-gradient-to-br from-emerald-900/30 to-slate-900/50 rounded-2xl p-6 border border-emerald-700/30">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-6 h-6 text-emerald-400" />
                  <h3 className="text-lg font-semibold text-white">Fortalezas</h3>
                </div>
                <div className="space-y-3">
                  <div className="bg-slate-800/50 rounded-xl p-4">
                    <div className="text-emerald-400 font-medium mb-1">Margen bruto: {metricas.margenBrutoPct}%</div>
                    <p className="text-slate-400 text-sm">El pricing y control de COGS se mantienen saludables.</p>
                  </div>
                  {datosActuales.utilidad_operativa > 0 && (
                    <div className="bg-slate-800/50 rounded-xl p-4">
                      <div className="text-emerald-400 font-medium mb-1">Utilidad positiva</div>
                      <p className="text-slate-400 text-sm">Margen operativo de {metricas.margenOperativoPct}% es competitivo para el sector.</p>
                    </div>
                  )}
                  {ranking && ranking.ventas <= 3 && (
                    <div className="bg-slate-800/50 rounded-xl p-4">
                      <div className="text-emerald-400 font-medium mb-1">Top {ranking.ventas} en ventas</div>
                      <p className="text-slate-400 text-sm">Este mes está entre los mejores del año en ingresos.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Recomendaciones */}
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
              <div className="flex items-center gap-3 mb-6">
                <Zap className="w-6 h-6 text-amber-400" />
                <h3 className="text-lg font-semibold text-white">Acciones Recomendadas</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-xl p-5 border border-amber-500/20">
                  <div className="text-amber-400 text-sm font-semibold mb-2">CORTO PLAZO</div>
                  <h4 className="text-white font-medium mb-2">Optimizar Cerveza</h4>
                  <p className="text-slate-400 text-sm">Negociar descuentos por volumen. Un 5% = {formatCurrency(datosActuales.cerveza_liquido * 0.05)} de ahorro.</p>
                </div>
                <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-xl p-5 border border-blue-500/20">
                  <div className="text-blue-400 text-sm font-semibold mb-2">MEDIANO PLAZO</div>
                  <h4 className="text-white font-medium mb-2">Estrategia Temporada</h4>
                  <p className="text-slate-400 text-sm">Desarrollar promociones para meses bajos (Ene-Feb) y maximizar temporada alta.</p>
                </div>
                <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-xl p-5 border border-emerald-500/20">
                  <div className="text-emerald-400 text-sm font-semibold mb-2">LARGO PLAZO</div>
                  <h4 className="text-white font-medium mb-2">Diversificar Ingresos</h4>
                  <p className="text-slate-400 text-sm">Explorar eventos privados, catering o mercancía para reducir dependencia.</p>
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-slate-500 text-sm border-t border-slate-800">
        Dashboard Financiero 2025 · La Pulquería · Datos reales del Estado de Resultados
      </footer>
    </div>
  );
};

export default Dashboard;
