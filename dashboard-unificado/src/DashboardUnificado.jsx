import React, { useState, useMemo } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, ComposedChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Percent, CreditCard, Banknote, Users, Music, Beer, ChevronDown, Calendar, LayoutDashboard, ArrowUpRight, ArrowDownRight, Target, Zap, AlertTriangle, CheckCircle } from 'lucide-react';

const DashboardUnificado = () => {
  const [vistaActual, setVistaActual] = useState('general'); // 'general' o índice del mes (0-10)
  const [menuAbierto, setMenuAbierto] = useState(false);

  // ══════════════════════════════════════════════════════════════════════════════
  // DATOS COMPLETOS - ESTADO DE RESULTADOS 2025
  // ══════════════════════════════════════════════════════════════════════════════
  
  const monthlyData = [
    { mes: "Enero", mes_corto: "ENE", ventas: 248449.7, efectivo: 88898.34, tarjeta: 100685.0, descuentos: 202.86, costos_operativos: 270590.655, cerveza_liquido: 66014.57, cerveza_logistico: 8800.0, alimentos: 13479.71, destilados: 2632.63, refresco: 1268.0, ultra_5pct: 12422.485, nomina: 45657.0, comision_personal: 13842.8, musica_entretenimiento: 13500.0, prestaciones_ley: 62969.09, barra_insumos: 9792.32, gastos_admin: 39001.99, otros_gastos: 29342.63, utilidad_operativa: -90485.57, cogs: 104617.40, margen_bruto: 143832.31 },
    { mes: "Febrero", mes_corto: "FEB", ventas: 280544.12, efectivo: 149688.62, tarjeta: 86787.0, descuentos: 922.17, costos_operativos: 251798.60, cerveza_liquido: 81591.62, cerveza_logistico: 0, alimentos: 8986.5, destilados: 6542.09, refresco: 3818.0, ultra_5pct: 14027.21, nomina: 46407.90, comision_personal: 16191.45, musica_entretenimiento: 12000.0, prestaciones_ley: 36800.0, barra_insumos: 9748.36, gastos_admin: 46224.80, otros_gastos: 10257.95, utilidad_operativa: -27737.23, cogs: 114965.42, margen_bruto: 165578.70 },
    { mes: "Marzo", mes_corto: "MAR", ventas: 1232646.03, efectivo: 609908.68, tarjeta: 446446.0, descuentos: 2324.8, costos_operativos: 767580.12, cerveza_liquido: 235859.65, cerveza_logistico: 21628.0, alimentos: 37868.63, destilados: 12030.87, refresco: 11901.05, ultra_5pct: 61632.30, nomina: 125580.07, comision_personal: 73801.61, musica_entretenimiento: 63000.0, prestaciones_ley: 34500.0, barra_insumos: 45664.94, gastos_admin: 80672.70, otros_gastos: 33470.57, utilidad_operativa: 350922.64, cogs: 380920.50, margen_bruto: 851725.53 },
    { mes: "Abril", mes_corto: "ABR", ventas: 1159801.51, efectivo: 563053.04, tarjeta: 452520.0, descuentos: 5546.97, costos_operativos: 836598.54, cerveza_liquido: 341648.16, cerveza_logistico: 25573.0, alimentos: 42009.38, destilados: 19180.98, refresco: 8304.03, ultra_5pct: 57990.08, nomina: 115860.90, comision_personal: 77020.02, musica_entretenimiento: 50500.0, prestaciones_ley: 36800.0, barra_insumos: 35451.61, gastos_admin: 80628.46, otros_gastos: 27806.57, utilidad_operativa: 214767.94, cogs: 494705.63, margen_bruto: 665095.88 },
    { mes: "Mayo", mes_corto: "MAY", ventas: 1391362.0, efectivo: 679208.75, tarjeta: 524275.0, descuentos: 5045.69, costos_operativos: 886498.78, cerveza_liquido: 338903.38, cerveza_logistico: 16720.0, alimentos: 53792.63, destilados: 17781.3, refresco: 17686.86, ultra_5pct: 69568.1, nomina: 114237.25, comision_personal: 75840.14, musica_entretenimiento: 79500.0, prestaciones_ley: 36800.0, barra_insumos: 41263.76, gastos_admin: 82524.27, otros_gastos: 32146.15, utilidad_operativa: 390192.81, cogs: 514452.27, margen_bruto: 876909.73 },
    { mes: "Junio", mes_corto: "JUN", ventas: 1181757.81, efectivo: 538298.59, tarjeta: 463914.0, descuentos: 14713.1, costos_operativos: 783908.40, cerveza_liquido: 305506.65, cerveza_logistico: 16720.0, alimentos: 45194.66, destilados: 17569.95, refresco: 15859.76, ultra_5pct: 59087.89, nomina: 105810.58, comision_personal: 69073.44, musica_entretenimiento: 71700.0, prestaciones_ley: 36800.0, barra_insumos: 17926.08, gastos_admin: 78711.33, otros_gastos: 29183.12, utilidad_operativa: 289954.96, cogs: 459938.91, margen_bruto: 721818.90 },
    { mes: "Julio", mes_corto: "JUL", ventas: 1304230.24, efectivo: 588098.9, tarjeta: 512366.0, descuentos: 12245.72, costos_operativos: 901489.78, cerveza_liquido: 360655.29, cerveza_logistico: 20196.0, alimentos: 44059.51, destilados: 25399.38, refresco: 17405.06, ultra_5pct: 65211.51, nomina: 117370.91, comision_personal: 77970.49, musica_entretenimiento: 80200.0, prestaciones_ley: 43700.0, barra_insumos: 24485.34, gastos_admin: 82676.24, otros_gastos: 34326.64, utilidad_operativa: 285737.58, cogs: 532926.75, margen_bruto: 771303.49 },
    { mes: "Agosto", mes_corto: "AGO", ventas: 1652549.58, efectivo: 790013.94, tarjeta: 681261.84, descuentos: 8692.58, costos_operativos: 1005015.85, cerveza_liquido: 423176.1, cerveza_logistico: 22836.0, alimentos: 57472.09, destilados: 21763.15, refresco: 19706.02, ultra_5pct: 82627.48, nomina: 119763.22, comision_personal: 92919.22, musica_entretenimiento: 72400.0, prestaciones_ley: 43700.0, barra_insumos: 26040.16, gastos_admin: 72420.91, otros_gastos: 40058.68, utilidad_operativa: 535054.15, cogs: 627580.84, margen_bruto: 1024968.74 },
    { mes: "Septiembre", mes_corto: "SEP", ventas: 1381195.86, efectivo: 641004.53, tarjeta: 567090.03, descuentos: 11324.18, costos_operativos: 957036.91, cerveza_liquido: 422153.22, cerveza_logistico: 19360.0, alimentos: 33910.86, destilados: 30159.27, refresco: 22926.71, ultra_5pct: 69059.79, nomina: 126596.39, comision_personal: 82051.03, musica_entretenimiento: 59600.0, prestaciones_ley: 43700.0, barra_insumos: 22572.72, gastos_admin: 85573.89, otros_gastos: 37796.66, utilidad_operativa: 300788.39, cogs: 597569.85, margen_bruto: 783626.01 },
    { mes: "Octubre", mes_corto: "OCT", ventas: 1305242.56, efectivo: 565935.64, tarjeta: 579845.0, descuentos: 8635.92, costos_operativos: 839611.57, cerveza_liquido: 328522.68, cerveza_logistico: 16632.0, alimentos: 38571.14, destilados: 26917.53, refresco: 20642.0, ultra_5pct: 65262.13, nomina: 121775.21, comision_personal: 77600.27, musica_entretenimiento: 56889.0, prestaciones_ley: 29900.0, barra_insumos: 27400.7, gastos_admin: 82284.61, otros_gastos: 56179.20, utilidad_operativa: 327167.19, cogs: 496547.48, margen_bruto: 808695.08 },
    { mes: "Noviembre", mes_corto: "NOV", ventas: 1490072.62, efectivo: 636482.39, tarjeta: 660592.01, descuentos: 9304.58, costos_operativos: 980619.15, cerveza_liquido: 430600.74, cerveza_logistico: 23936.0, alimentos: 39573.09, destilados: 29290.68, refresco: 20414.31, ultra_5pct: 74503.63, nomina: 120070.58, comision_personal: 87971.59, musica_entretenimiento: 74400.0, prestaciones_ley: 29900.0, barra_insumos: 24824.82, gastos_admin: 88021.00, otros_gastos: 50998.27, utilidad_operativa: 370434.19, cogs: 618318.45, margen_bruto: 871754.17 },
  ];

  const totalesAnuales = {
    ventas: 12627852.03,
    efectivo: 5850591.42,
    tarjeta: 5075781.88,
    descuentos: 78958.57,
    costos_operativos: 8481386.35,
    gastos_admin: 818740.20,
    otros_gastos: 387654.72,
    utilidad_operativa: 2940070.76,
    cogs: 4942543.49,
    margen_bruto: 7685308.54,
  };

  // Datos del mes seleccionado o totales
  const datosActuales = useMemo(() => {
    if (vistaActual === 'general') {
      return {
        titulo: 'General (YTD)',
        subtitulo: 'Enero - Noviembre 2025',
        ...totalesAnuales,
        promedio_mensual: totalesAnuales.ventas / 11,
      };
    } else {
      const mes = monthlyData[vistaActual];
      const mesAnterior = vistaActual > 0 ? monthlyData[vistaActual - 1] : null;
      return {
        titulo: mes.mes,
        subtitulo: '2025',
        ...mes,
        mesAnterior,
        variacion_ventas: mesAnterior ? ((mes.ventas - mesAnterior.ventas) / mesAnterior.ventas * 100) : null,
        variacion_costos: mesAnterior ? ((mes.costos_operativos - mesAnterior.costos_operativos) / mesAnterior.costos_operativos * 100) : null,
        variacion_utilidad: mesAnterior && mesAnterior.utilidad_operativa !== 0 ? ((mes.utilidad_operativa - mesAnterior.utilidad_operativa) / Math.abs(mesAnterior.utilidad_operativa) * 100) : null,
      };
    }
  }, [vistaActual]);

  // Métricas calculadas
  const metricas = useMemo(() => {
    const d = datosActuales;
    return {
      margenBrutoPct: d.ventas > 0 ? (d.margen_bruto / d.ventas * 100).toFixed(1) : '0.0',
      margenOperativoPct: d.ventas > 0 ? (d.utilidad_operativa / d.ventas * 100).toFixed(1) : '0.0',
      costosVentasPct: d.ventas > 0 ? (d.costos_operativos / d.ventas * 100).toFixed(1) : '0.0',
      cogsPct: d.ventas > 0 ? (d.cogs / d.ventas * 100).toFixed(1) : '0.0',
      efectivoPct: d.ventas > 0 ? (d.efectivo / d.ventas * 100).toFixed(1) : '0.0',
      tarjetaPct: d.ventas > 0 ? (d.tarjeta / d.ventas * 100).toFixed(1) : '0.0',
    };
  }, [datosActuales]);

  // Colores
  const COLORS = ['#f97316', '#fb923c', '#fbbf24', '#22c55e', '#14b8a6', '#3b82f6', '#8b5cf6', '#ec4899', '#ef4444', '#64748b'];

  // Formateo
  const formatCurrency = (value) => {
    if (Math.abs(value) >= 1000000) return `$${(value / 1000000).toFixed(2)}M`;
    if (Math.abs(value) >= 1000) return `$${(value / 1000).toFixed(0)}K`;
    return `$${value.toFixed(0)}`;
  };

  const formatFullCurrency = (value) => {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
  };

  // KPI Card
  const KPICard = ({ title, value, subtitle, trend, icon: Icon }) => (
    <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl p-5 border border-slate-700/50 hover:border-orange-500/30 transition-all duration-300">
      <div className="flex justify-between items-start mb-2">
        <span className="text-slate-400 text-xs font-medium tracking-wider uppercase">{title}</span>
        {Icon && <Icon className="w-5 h-5 text-orange-400" />}
      </div>
      <div className="text-2xl md:text-3xl font-bold text-white">{value}</div>
      {subtitle && <div className="text-slate-400 text-sm mt-1">{subtitle}</div>}
      {trend !== null && trend !== undefined && (
        <div className={`flex items-center mt-2 text-xs ${trend >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
          {trend >= 0 ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
          <span>{trend >= 0 ? '+' : ''}{trend.toFixed(1)}% vs mes anterior</span>
        </div>
      )}
    </div>
  );

  // Tooltip
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

  // Estructura de costos para pie chart
  const costosParaGrafico = useMemo(() => {
    if (vistaActual === 'general') {
      return [
        { name: 'Cerveza', value: monthlyData.reduce((sum, m) => sum + m.cerveza_liquido + m.cerveza_logistico, 0) },
        { name: 'Nómina', value: monthlyData.reduce((sum, m) => sum + m.nomina, 0) },
        { name: 'Comisiones', value: monthlyData.reduce((sum, m) => sum + m.comision_personal, 0) },
        { name: 'Música/Entret.', value: monthlyData.reduce((sum, m) => sum + m.musica_entretenimiento, 0) },
        { name: 'Alimentos', value: monthlyData.reduce((sum, m) => sum + m.alimentos, 0) },
        { name: 'Prestaciones', value: monthlyData.reduce((sum, m) => sum + m.prestaciones_ley, 0) },
        { name: 'Otros', value: totalesAnuales.costos_operativos - monthlyData.reduce((sum, m) => sum + m.cerveza_liquido + m.cerveza_logistico + m.nomina + m.comision_personal + m.musica_entretenimiento + m.alimentos + m.prestaciones_ley, 0) },
      ];
    } else {
      const m = monthlyData[vistaActual];
      return [
        { name: 'Cerveza', value: m.cerveza_liquido + m.cerveza_logistico },
        { name: 'Nómina', value: m.nomina },
        { name: 'Comisiones', value: m.comision_personal },
        { name: 'Música/Entret.', value: m.musica_entretenimiento },
        { name: 'Alimentos', value: m.alimentos },
        { name: 'Prestaciones', value: m.prestaciones_ley },
        { name: 'Otros', value: m.costos_operativos - (m.cerveza_liquido + m.cerveza_logistico + m.nomina + m.comision_personal + m.musica_entretenimiento + m.alimentos + m.prestaciones_ley) },
      ];
    }
  }, [vistaActual]);

  // Datos para gráfico de tendencia
  const datosTendencia = monthlyData.map(m => ({
    mes: m.mes_corto,
    ventas: m.ventas,
    costos: m.costos_operativos,
    utilidad: m.utilidad_operativa,
    margen: m.ventas > 0 ? (m.utilidad_operativa / m.ventas * 100) : 0,
  }));

  // Ranking del mes actual
  const rankingMes = useMemo(() => {
    if (vistaActual === 'general') return null;
    const ventasOrdenadas = [...monthlyData].sort((a, b) => b.ventas - a.ventas);
    const utilidadOrdenada = [...monthlyData].sort((a, b) => b.utilidad_operativa - a.utilidad_operativa);
    const mesActual = monthlyData[vistaActual];
    return {
      ventas: ventasOrdenadas.findIndex(m => m.mes === mesActual.mes) + 1,
      utilidad: utilidadOrdenada.findIndex(m => m.mes === mesActual.mes) + 1,
    };
  }, [vistaActual]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* ══════════════════════════════════════════════════════════════════════════ */}
      {/* HEADER CON NAVEGACIÓN */}
      {/* ══════════════════════════════════════════════════════════════════════════ */}
      <div className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center">
                <Beer className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">La Pulquería</h1>
                <p className="text-slate-400 text-xs">Dashboard Financiero 2025</p>
              </div>
            </div>

            {/* Selector de Vista */}
            <div className="relative">
              <button
                onClick={() => setMenuAbierto(!menuAbierto)}
                className="flex items-center gap-3 bg-slate-800 hover:bg-slate-700 rounded-xl px-4 py-3 border border-slate-600 transition-all min-w-[200px]"
              >
                <Calendar className="w-5 h-5 text-orange-400" />
                <div className="text-left flex-1">
                  <div className="text-white font-medium">{datosActuales.titulo}</div>
                  <div className="text-slate-400 text-xs">{datosActuales.subtitulo}</div>
                </div>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${menuAbierto ? 'rotate-180' : ''}`} />
              </button>

              {menuAbierto && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-slate-600 rounded-xl shadow-2xl overflow-hidden z-50">
                  <button
                    onClick={() => { setVistaActual('general'); setMenuAbierto(false); }}
                    className={`w-full px-4 py-3 text-left hover:bg-slate-700 flex items-center gap-3 ${vistaActual === 'general' ? 'bg-orange-500/20 border-l-2 border-orange-500' : ''}`}
                  >
                    <LayoutDashboard className="w-4 h-4 text-orange-400" />
                    <div>
                      <div className="text-white font-medium">Vista General (YTD)</div>
                      <div className="text-slate-400 text-xs">Enero - Noviembre 2025</div>
                    </div>
                  </button>
                  <div className="border-t border-slate-700 my-1"></div>
                  <div className="max-h-64 overflow-y-auto">
                    {monthlyData.map((mes, index) => (
                      <button
                        key={mes.mes}
                        onClick={() => { setVistaActual(index); setMenuAbierto(false); }}
                        className={`w-full px-4 py-2 text-left hover:bg-slate-700 flex items-center justify-between ${vistaActual === index ? 'bg-orange-500/20 border-l-2 border-orange-500' : ''}`}
                      >
                        <span className="text-white">{mes.mes}</span>
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
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════════ */}
      {/* CONTENIDO PRINCIPAL */}
      {/* ══════════════════════════════════════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* KPIs Principales */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <KPICard
            title={vistaActual === 'general' ? "Ventas YTD" : "Ventas del Mes"}
            value={formatCurrency(datosActuales.ventas)}
            subtitle={formatFullCurrency(datosActuales.ventas)}
            trend={datosActuales.variacion_ventas}
            icon={DollarSign}
          />
          <KPICard
            title="Utilidad Operativa"
            value={formatCurrency(datosActuales.utilidad_operativa)}
            subtitle={`${metricas.margenOperativoPct}% margen`}
            trend={datosActuales.variacion_utilidad}
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
            icon={Target}
          />
        </div>

        {/* Métricas Secundarias */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-6">
          <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/30">
            <div className="text-slate-400 text-xs uppercase mb-1">COGS</div>
            <div className="text-lg font-bold text-white">{metricas.cogsPct}%</div>
            <div className="text-slate-500 text-xs">{formatCurrency(datosActuales.cogs)}</div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/30">
            <div className="text-slate-400 text-xs uppercase mb-1">Efectivo</div>
            <div className="text-lg font-bold text-emerald-400">{metricas.efectivoPct}%</div>
            <div className="text-slate-500 text-xs">{formatCurrency(datosActuales.efectivo)}</div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/30">
            <div className="text-slate-400 text-xs uppercase mb-1">Tarjeta</div>
            <div className="text-lg font-bold text-blue-400">{metricas.tarjetaPct}%</div>
            <div className="text-slate-500 text-xs">{formatCurrency(datosActuales.tarjeta)}</div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/30">
            <div className="text-slate-400 text-xs uppercase mb-1">Gastos Admin</div>
            <div className="text-lg font-bold text-white">{formatCurrency(datosActuales.gastos_admin)}</div>
            <div className="text-slate-500 text-xs">{(datosActuales.gastos_admin / datosActuales.ventas * 100).toFixed(1)}%</div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/30">
            <div className="text-slate-400 text-xs uppercase mb-1">Otros Gastos</div>
            <div className="text-lg font-bold text-white">{formatCurrency(datosActuales.otros_gastos)}</div>
            <div className="text-slate-500 text-xs">{(datosActuales.otros_gastos / datosActuales.ventas * 100).toFixed(1)}%</div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/30">
            <div className="text-slate-400 text-xs uppercase mb-1">Descuentos</div>
            <div className="text-lg font-bold text-white">{formatCurrency(datosActuales.descuentos)}</div>
            <div className="text-slate-500 text-xs">{(datosActuales.descuentos / datosActuales.ventas * 100).toFixed(2)}%</div>
          </div>
        </div>

        {/* Ranking (solo para meses individuales) */}
        {rankingMes && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-amber-500/20 to-amber-600/10 rounded-xl p-4 border border-amber-500/30">
              <div className="text-amber-400 text-xs font-medium mb-1">Ranking Ventas</div>
              <div className="text-3xl font-bold text-white">#{rankingMes.ventas}</div>
              <div className="text-slate-400 text-xs">de 11 meses</div>
            </div>
            <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 rounded-xl p-4 border border-emerald-500/30">
              <div className="text-emerald-400 text-xs font-medium mb-1">Ranking Utilidad</div>
              <div className="text-3xl font-bold text-white">#{rankingMes.utilidad}</div>
              <div className="text-slate-400 text-xs">de 11 meses</div>
            </div>
            <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-xl p-4 border border-blue-500/30">
              <div className="text-blue-400 text-xs font-medium mb-1">vs Promedio Ventas</div>
              <div className="text-2xl font-bold text-white">
                {((datosActuales.ventas - totalesAnuales.ventas/11) / (totalesAnuales.ventas/11) * 100).toFixed(1)}%
              </div>
              <div className="text-slate-400 text-xs">prom: {formatCurrency(totalesAnuales.ventas/11)}</div>
            </div>
            <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 rounded-xl p-4 border border-purple-500/30">
              <div className="text-purple-400 text-xs font-medium mb-1">vs Promedio Utilidad</div>
              <div className="text-2xl font-bold text-white">
                {((datosActuales.utilidad_operativa - totalesAnuales.utilidad_operativa/11) / (totalesAnuales.utilidad_operativa/11) * 100).toFixed(1)}%
              </div>
              <div className="text-slate-400 text-xs">prom: {formatCurrency(totalesAnuales.utilidad_operativa/11)}</div>
            </div>
          </div>
        )}

        {/* Gráficos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Tendencia Mensual */}
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
            <h3 className="text-lg font-semibold text-white mb-4">
              {vistaActual === 'general' ? 'Tendencia Mensual 2025' : 'Contexto Anual'}
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <ComposedChart data={datosTendencia}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="mes" stroke="#9ca3af" tick={{ fontSize: 11 }} />
                <YAxis yAxisId="left" stroke="#22c55e" tickFormatter={(v) => formatCurrency(v)} />
                <YAxis yAxisId="right" orientation="right" stroke="#f97316" tickFormatter={(v) => formatCurrency(v)} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar yAxisId="left" dataKey="ventas" name="Ventas" fill="#22c55e" radius={[4, 4, 0, 0]} opacity={0.7} />
                <Line yAxisId="right" type="monotone" dataKey="utilidad" name="Utilidad" stroke="#f97316" strokeWidth={3} dot={{ r: 4 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Estructura de Costos */}
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
            <h3 className="text-lg font-semibold text-white mb-4">Estructura de Costos Operativos</h3>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={costosParaGrafico}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                  label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                >
                  {costosParaGrafico.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatFullCurrency(value)} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Distribución de Ventas y Waterfall */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Distribución por Método de Pago */}
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
            <h3 className="text-lg font-semibold text-white mb-4">Distribución de Ventas</h3>
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
                <Tooltip formatter={(value) => formatFullCurrency(value)} />
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

          {/* Márgenes por Mes */}
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
            <h3 className="text-lg font-semibold text-white mb-4">Margen Operativo por Mes</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={datosTendencia}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="mes" stroke="#9ca3af" tick={{ fontSize: 10 }} />
                <YAxis stroke="#9ca3af" tickFormatter={(v) => `${v.toFixed(0)}%`} domain={[-40, 40]} />
                <Tooltip formatter={(value) => `${value.toFixed(1)}%`} />
                <Bar dataKey="margen" name="Margen %" radius={[4, 4, 0, 0]}>
                  {datosTendencia.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.margen >= 0 ? '#22c55e' : '#ef4444'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Alertas */}
          <div className="bg-gradient-to-br from-rose-900/20 to-slate-900/50 rounded-2xl p-6 border border-rose-700/30">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-5 h-5 text-rose-400" />
              <h3 className="text-lg font-semibold text-white">Áreas de Atención</h3>
            </div>
            <div className="space-y-3">
              {vistaActual === 'general' ? (
                <>
                  <div className="bg-slate-800/50 rounded-lg p-3">
                    <div className="text-rose-400 font-medium text-sm">Cerveza: ~40% de costos operativos</div>
                    <p className="text-slate-400 text-xs mt-1">Principal oportunidad de negociación con proveedores</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-3">
                    <div className="text-rose-400 font-medium text-sm">Enero y Febrero en negativo</div>
                    <p className="text-slate-400 text-xs mt-1">Estrategia de temporada baja necesaria</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-slate-800/50 rounded-lg p-3">
                    <div className="text-rose-400 font-medium text-sm">Costo cerveza: {((monthlyData[vistaActual]?.cerveza_liquido + monthlyData[vistaActual]?.cerveza_logistico) / monthlyData[vistaActual]?.costos_operativos * 100).toFixed(1)}%</div>
                    <p className="text-slate-400 text-xs mt-1">de los costos operativos del mes</p>
                  </div>
                  {datosActuales.variacion_costos > datosActuales.variacion_ventas && (
                    <div className="bg-slate-800/50 rounded-lg p-3">
                      <div className="text-rose-400 font-medium text-sm">Costos crecen más que ventas</div>
                      <p className="text-slate-400 text-xs mt-1">Costos +{datosActuales.variacion_costos?.toFixed(1)}% vs Ventas +{datosActuales.variacion_ventas?.toFixed(1)}%</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Fortalezas */}
          <div className="bg-gradient-to-br from-emerald-900/20 to-slate-900/50 rounded-2xl p-6 border border-emerald-700/30">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <h3 className="text-lg font-semibold text-white">Fortalezas</h3>
            </div>
            <div className="space-y-3">
              {vistaActual === 'general' ? (
                <>
                  <div className="bg-slate-800/50 rounded-lg p-3">
                    <div className="text-emerald-400 font-medium text-sm">Margen bruto sólido: {metricas.margenBrutoPct}%</div>
                    <p className="text-slate-400 text-xs mt-1">Pricing saludable y buen control de COGS</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-3">
                    <div className="text-emerald-400 font-medium text-sm">EBITDA: {metricas.margenOperativoPct}%</div>
                    <p className="text-slate-400 text-xs mt-1">Competitivo para el sector</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-slate-800/50 rounded-lg p-3">
                    <div className="text-emerald-400 font-medium text-sm">Margen del mes: {metricas.margenOperativoPct}%</div>
                    <p className="text-slate-400 text-xs mt-1">Utilidad: {formatCurrency(datosActuales.utilidad_operativa)}</p>
                  </div>
                  {rankingMes && rankingMes.ventas <= 3 && (
                    <div className="bg-slate-800/50 rounded-lg p-3">
                      <div className="text-emerald-400 font-medium text-sm">Top {rankingMes.ventas} en ventas</div>
                      <p className="text-slate-400 text-xs mt-1">De los mejores meses del año</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-slate-500 text-sm">
          Dashboard Financiero 2025 · La Pulquería · Datos del Estado de Resultados
        </div>
      </div>
    </div>
  );
};

export default DashboardUnificado;
