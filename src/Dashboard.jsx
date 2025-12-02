import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, ComposedChart } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Percent, AlertTriangle, CheckCircle, ArrowUpRight, ArrowDownRight, Target, Zap } from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // DATOS REALES DEL ESTADO DE RESULTADOS 2025 - LA PULQUERÍA
  const meses = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV'];
  
  const ventasData = [248449.7, 280544.12, 1232646.03, 1159801.51, 1391362, 1181757.81, 1304230.24, 1652549.58, 1381195.86, 1305242.56, 1490072.62];
  const costosData = [270590.66, 251798.60, 767580.12, 836598.54, 886498.78, 783908.40, 901489.78, 1005015.85, 957036.91, 839611.57, 980619.15];
  const utilidadData = [-90485.57, -27737.23, 350922.64, 214767.94, 390192.81, 289954.96, 285737.58, 535054.15, 300788.39, 327167.19, 370434.19];
  
  // KPIs principales
  const kpis = {
    ventasTotal: 12627852.03,
    costosOperativos: 8481386.35,
    gastosAdmin: 818740.20,
    otrosGastos: 387654.72,
    utilidadOperativa: 2940070.76,
    cogsTotal: 4679525.43,
    margenBruto: 7948326.60,
    margenBrutoPct: 62.94,
    ebitdaPct: 23.28,
    efectivoTotal: 5850591.42,
    tarjetaTotal: 5075781.88,
    descuentosTotal: 78958.57,
    puntoEquilibrio: 1033165.76,
  };

  // Datos para gráficos
  const monthlyData = meses.map((mes, i) => ({
    mes,
    ventas: ventasData[i],
    costos: costosData[i],
    utilidad: utilidadData[i],
    margenBruto: ((ventasData[i] - costosData[i]) / ventasData[i] * 100).toFixed(1),
    margenNeto: (utilidadData[i] / ventasData[i] * 100).toFixed(1),
  }));

  // Estructura de costos operativos
  const costosDetalle = [
    { name: 'Cerveza (líquido)', value: 3334632.06, pct: 39.3 },
    { name: 'Nómina', value: 1159129.99, pct: 13.7 },
    { name: 'Comisiones Personal', value: 744282.06, pct: 8.8 },
    { name: 'Música/Entretenimiento', value: 633689, pct: 7.5 },
    { name: 'Prestaciones de Ley', value: 435569.09, pct: 5.1 },
    { name: 'Alimentos', value: 414918.20, pct: 4.9 },
    { name: 'Ultra 5%', value: 368374.54, pct: 4.3 },
    { name: 'Barra/Insumos', value: 285170.81, pct: 3.4 },
    { name: 'Otros', value: 1105610.60, pct: 13.0 },
  ];

  // Gastos administrativos
  const gastosAdminDetalle = [
    { name: 'Comisión Administrativo', value: 203683.89 },
    { name: 'Sueldo Administrativo', value: 110000 },
    { name: 'Sueldo Jefe Seguridad', value: 105263.16 },
    { name: 'Comisión Operativo', value: 91315.13 },
    { name: 'Sueldo Operativo', value: 88000 },
    { name: 'Sueldo Emiliano', value: 88000 },
    { name: 'Otros Sueldos/Comisiones', value: 132478.02 },
  ];

  // Otros gastos
  const otrosGastosDetalle = [
    { name: 'Comisión Tarjeta', value: 126894.55, pct: 32.7 },
    { name: 'Gastos Jurídicos', value: 98166.94, pct: 25.3 },
    { name: 'Pagos Comandante', value: 82000, pct: 21.2 },
    { name: 'Otros', value: 80593.23, pct: 20.8 },
  ];

  // Colores
  const COLORS = {
    primary: '#1a1a2e',
    secondary: '#16213e',
    accent: '#e94560',
    success: '#00bf63',
    warning: '#ffc107',
    danger: '#dc3545',
    gold: '#d4af37',
    silver: '#c0c0c0',
    bronze: '#cd7f32',
  };

  const PIE_COLORS = ['#e94560', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96c93d', '#feca57', '#ff9f43', '#a55eea', '#778beb'];

  // Formato de moneda
  const formatCurrency = (value) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
    return `$${value.toFixed(0)}`;
  };

  const formatFullCurrency = (value) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Componente KPI Card
  const KPICard = ({ title, value, subtitle, trend, trendValue, icon: Icon, color = 'accent' }) => (
    <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 rounded-2xl p-5 border border-slate-700/50 hover:border-rose-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-rose-500/10">
      <div className="flex justify-between items-start mb-3">
        <span className="text-slate-400 text-sm font-medium tracking-wide uppercase">{title}</span>
        {Icon && <Icon className="w-5 h-5 text-rose-400" />}
      </div>
      <div className="text-2xl md:text-3xl font-bold text-white mb-1">{value}</div>
      {subtitle && <div className="text-slate-400 text-sm">{subtitle}</div>}
      {trend !== undefined && (
        <div className={`flex items-center mt-2 text-sm ${trend >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
          {trend >= 0 ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
          <span>{Math.abs(trendValue || trend).toFixed(1)}% vs mes anterior</span>
        </div>
      )}
    </div>
  );

  // Custom Tooltip
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

  // Variaciones MoM
  const variacionesMoM = meses.slice(1).map((mes, i) => ({
    mes,
    ventas: ((ventasData[i + 1] - ventasData[i]) / ventasData[i] * 100).toFixed(1),
    costos: ((costosData[i + 1] - costosData[i]) / costosData[i] * 100).toFixed(1),
    utilidad: utilidadData[i] !== 0 ? ((utilidadData[i + 1] - utilidadData[i]) / Math.abs(utilidadData[i]) * 100).toFixed(1) : 'N/A',
  }));

  // Acumulado mensual
  let acumuladoVentas = 0;
  let acumuladoUtilidad = 0;
  const acumuladoData = meses.map((mes, i) => {
    acumuladoVentas += ventasData[i];
    acumuladoUtilidad += utilidadData[i];
    return {
      mes,
      ventasAcum: acumuladoVentas,
      utilidadAcum: acumuladoUtilidad,
      margenAcum: (acumuladoUtilidad / acumuladoVentas * 100).toFixed(1),
    };
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-4 md:p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-rose-400 via-pink-400 to-amber-400 bg-clip-text text-transparent">
              La Pulquería
            </h1>
            <p className="text-slate-400 mt-1">Dashboard Ejecutivo · Estado de Resultados 2025</p>
          </div>
          <div className="flex items-center gap-2 bg-slate-800/50 rounded-xl px-4 py-2 border border-slate-700/50">
            <span className="text-slate-400 text-sm">Período:</span>
            <span className="text-white font-semibold">Enero - Noviembre 2025</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mt-6">
          {['overview', 'costos', 'tendencias', 'insights'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeTab === tab
                  ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
                  : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 hover:text-white'
              }`}
            >
              {tab === 'overview' && 'Resumen'}
              {tab === 'costos' && 'Estructura de Costos'}
              {tab === 'tendencias' && 'Tendencias'}
              {tab === 'insights' && 'Insights & Recomendaciones'}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <>
          {/* KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <KPICard
              title="Ingresos YTD"
              value={formatCurrency(kpis.ventasTotal)}
              subtitle={formatFullCurrency(kpis.ventasTotal)}
              icon={DollarSign}
            />
            <KPICard
              title="EBITDA"
              value={formatCurrency(kpis.utilidadOperativa)}
              subtitle={`${kpis.ebitdaPct.toFixed(1)}% margen`}
              icon={TrendingUp}
            />
            <KPICard
              title="Margen Bruto"
              value={`${kpis.margenBrutoPct.toFixed(1)}%`}
              subtitle={formatCurrency(kpis.margenBruto)}
              icon={Percent}
            />
            <KPICard
              title="Punto Equilibrio"
              value={formatCurrency(kpis.puntoEquilibrio)}
              subtitle="mensual estimado"
              icon={Target}
            />
          </div>

          {/* Main Chart - Ingresos vs Costos vs Utilidad */}
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 mb-8">
            <h3 className="text-lg font-semibold text-white mb-4">Ingresos vs Costos vs Utilidad Mensual</h3>
            <ResponsiveContainer width="100%" height={350}>
              <ComposedChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="mes" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" tickFormatter={(v) => formatCurrency(v)} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="ventas" name="Ventas" fill="#4ecdc4" radius={[4, 4, 0, 0]} />
                <Bar dataKey="costos" name="Costos Op." fill="#ff6b6b" radius={[4, 4, 0, 0]} />
                <Line type="monotone" dataKey="utilidad" name="Utilidad" stroke="#feca57" strokeWidth={3} dot={{ fill: '#feca57', r: 5 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Secondary Charts Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Distribución de Ventas */}
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
              <h3 className="text-lg font-semibold text-white mb-4">Distribución de Ventas por Medio</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Efectivo', value: kpis.efectivoTotal },
                      { name: 'Tarjeta', value: kpis.tarjetaTotal },
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                  >
                    <Cell fill="#4ecdc4" />
                    <Cell fill="#e94560" />
                  </Pie>
                  <Tooltip formatter={(value) => formatFullCurrency(value)} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#4ecdc4]"></div>
                  <span className="text-slate-400 text-sm">Efectivo: {formatCurrency(kpis.efectivoTotal)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#e94560]"></div>
                  <span className="text-slate-400 text-sm">Tarjeta: {formatCurrency(kpis.tarjetaTotal)}</span>
                </div>
              </div>
            </div>

            {/* Margen de Utilidad */}
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
              <h3 className="text-lg font-semibold text-white mb-4">Evolución del Margen Neto</h3>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="mes" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" tickFormatter={(v) => `${v}%`} domain={[-40, 40]} />
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Area
                    type="monotone"
                    dataKey="margenNeto"
                    name="Margen Neto"
                    stroke="#e94560"
                    fill="url(#margenGradient)"
                    strokeWidth={2}
                  />
                  <defs>
                    <linearGradient id="margenGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#e94560" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#e94560" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/30">
              <div className="text-slate-400 text-xs uppercase mb-1">Costos Operativos</div>
              <div className="text-xl font-bold text-white">{formatCurrency(kpis.costosOperativos)}</div>
              <div className="text-rose-400 text-sm">{(kpis.costosOperativos / kpis.ventasTotal * 100).toFixed(1)}% de ventas</div>
            </div>
            <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/30">
              <div className="text-slate-400 text-xs uppercase mb-1">Gastos Admin</div>
              <div className="text-xl font-bold text-white">{formatCurrency(kpis.gastosAdmin)}</div>
              <div className="text-amber-400 text-sm">{(kpis.gastosAdmin / kpis.ventasTotal * 100).toFixed(1)}% de ventas</div>
            </div>
            <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/30">
              <div className="text-slate-400 text-xs uppercase mb-1">Otros Gastos</div>
              <div className="text-xl font-bold text-white">{formatCurrency(kpis.otrosGastos)}</div>
              <div className="text-amber-400 text-sm">{(kpis.otrosGastos / kpis.ventasTotal * 100).toFixed(1)}% de ventas</div>
            </div>
            <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/30">
              <div className="text-slate-400 text-xs uppercase mb-1">Descuentos</div>
              <div className="text-xl font-bold text-white">{formatCurrency(kpis.descuentosTotal)}</div>
              <div className="text-emerald-400 text-sm">{(kpis.descuentosTotal / kpis.ventasTotal * 100).toFixed(2)}% de ventas</div>
            </div>
            <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/30">
              <div className="text-slate-400 text-xs uppercase mb-1">COGS</div>
              <div className="text-xl font-bold text-white">{formatCurrency(kpis.cogsTotal)}</div>
              <div className="text-emerald-400 text-sm">{(kpis.cogsTotal / kpis.ventasTotal * 100).toFixed(1)}% de ventas</div>
            </div>
          </div>
        </>
      )}

      {/* Costos Tab */}
      {activeTab === 'costos' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Estructura de Costos Operativos */}
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
              <h3 className="text-lg font-semibold text-white mb-4">Estructura de Costos Operativos</h3>
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={costosDetalle}
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    dataKey="value"
                    label={({ name, pct }) => `${pct}%`}
                  >
                    {costosDetalle.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatFullCurrency(value)} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Tabla de Costos Detallada */}
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
              <h3 className="text-lg font-semibold text-white mb-4">Top Costos Operativos</h3>
              <div className="space-y-3">
                {costosDetalle.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: PIE_COLORS[index % PIE_COLORS.length] }}
                      />
                      <span className="text-slate-300 text-sm">{item.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-medium">{formatCurrency(item.value)}</div>
                      <div className="text-slate-500 text-xs">{item.pct}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Gastos Administrativos y Otros */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
              <h3 className="text-lg font-semibold text-white mb-4">Gastos Administrativos</h3>
              <div className="text-2xl font-bold text-rose-400 mb-4">{formatFullCurrency(kpis.gastosAdmin)}</div>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={gastosAdminDetalle} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis type="number" stroke="#9ca3af" tickFormatter={(v) => formatCurrency(v)} />
                  <YAxis type="category" dataKey="name" stroke="#9ca3af" width={120} tick={{ fontSize: 11 }} />
                  <Tooltip formatter={(value) => formatFullCurrency(value)} />
                  <Bar dataKey="value" fill="#e94560" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
              <h3 className="text-lg font-semibold text-white mb-4">Otros Gastos</h3>
              <div className="text-2xl font-bold text-amber-400 mb-4">{formatFullCurrency(kpis.otrosGastos)}</div>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={otrosGastosDetalle}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, pct }) => `${pct}%`}
                  >
                    {otrosGastosDetalle.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index + 3]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatFullCurrency(value)} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}

      {/* Tendencias Tab */}
      {activeTab === 'tendencias' && (
        <>
          {/* Ventas Acumuladas */}
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 mb-8">
            <h3 className="text-lg font-semibold text-white mb-4">Ventas y Utilidad Acumulada YTD</h3>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={acumuladoData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="mes" stroke="#9ca3af" />
                <YAxis yAxisId="left" stroke="#4ecdc4" tickFormatter={(v) => formatCurrency(v)} />
                <YAxis yAxisId="right" orientation="right" stroke="#e94560" tickFormatter={(v) => formatCurrency(v)} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area yAxisId="left" type="monotone" dataKey="ventasAcum" name="Ventas Acum." fill="#4ecdc4" fillOpacity={0.3} stroke="#4ecdc4" strokeWidth={2} />
                <Line yAxisId="right" type="monotone" dataKey="utilidadAcum" name="Utilidad Acum." stroke="#e94560" strokeWidth={3} dot={{ fill: '#e94560', r: 5 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Variaciones MoM */}
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 mb-8">
            <h3 className="text-lg font-semibold text-white mb-4">Variaciones Mes a Mes (%)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Mes</th>
                    <th className="text-right py-3 px-4 text-slate-400 font-medium">Δ Ventas</th>
                    <th className="text-right py-3 px-4 text-slate-400 font-medium">Δ Costos</th>
                    <th className="text-right py-3 px-4 text-slate-400 font-medium">Δ Utilidad</th>
                  </tr>
                </thead>
                <tbody>
                  {variacionesMoM.map((row, i) => (
                    <tr key={i} className="border-b border-slate-800 hover:bg-slate-700/30">
                      <td className="py-3 px-4 text-white font-medium">{row.mes}</td>
                      <td className={`py-3 px-4 text-right ${parseFloat(row.ventas) >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {parseFloat(row.ventas) >= 0 ? '+' : ''}{row.ventas}%
                      </td>
                      <td className={`py-3 px-4 text-right ${parseFloat(row.costos) <= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {parseFloat(row.costos) >= 0 ? '+' : ''}{row.costos}%
                      </td>
                      <td className={`py-3 px-4 text-right ${row.utilidad !== 'N/A' && parseFloat(row.utilidad) >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {row.utilidad !== 'N/A' ? (parseFloat(row.utilidad) >= 0 ? '+' : '') + row.utilidad + '%' : 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Tendencia de Márgenes */}
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
            <h3 className="text-lg font-semibold text-white mb-4">Tendencia de Márgenes Bruto vs Neto</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="mes" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" domain={[-40, 50]} tickFormatter={(v) => `${v}%`} />
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend />
                <Line type="monotone" dataKey="margenBruto" name="Margen Bruto" stroke="#4ecdc4" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="margenNeto" name="Margen Neto" stroke="#e94560" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      )}

      {/* Insights Tab */}
      {activeTab === 'insights' && (
        <div className="space-y-6">
          {/* Alertas y Oportunidades */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-rose-900/30 to-slate-900/50 rounded-2xl p-6 border border-rose-700/30">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-rose-400" />
                <h3 className="text-lg font-semibold text-white">Áreas de Atención</h3>
              </div>
              <div className="space-y-4">
                <div className="bg-slate-800/50 rounded-xl p-4">
                  <div className="text-rose-400 font-medium mb-1">Cerveza representa 39% de costos</div>
                  <p className="text-slate-400 text-sm">El costo de cerveza (líquido) es el mayor gasto operativo. Negociar mejores términos con proveedores podría generar ahorros significativos.</p>
                </div>
                <div className="bg-slate-800/50 rounded-xl p-4">
                  <div className="text-rose-400 font-medium mb-1">Enero y Febrero en negativo</div>
                  <p className="text-slate-400 text-sm">Los primeros dos meses tuvieron pérdidas operativas. Considerar promociones o ajustar operación para temporada baja.</p>
                </div>
                <div className="bg-slate-800/50 rounded-xl p-4">
                  <div className="text-rose-400 font-medium mb-1">Comisiones representan 8.8% de costos</div>
                  <p className="text-slate-400 text-sm">Las comisiones al personal son un gasto significativo. Revisar estructura de incentivos vs resultados.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-900/30 to-slate-900/50 rounded-2xl p-6 border border-emerald-700/30">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-6 h-6 text-emerald-400" />
                <h3 className="text-lg font-semibold text-white">Fortalezas y Oportunidades</h3>
              </div>
              <div className="space-y-4">
                <div className="bg-slate-800/50 rounded-xl p-4">
                  <div className="text-emerald-400 font-medium mb-1">Margen bruto sólido del 62.9%</div>
                  <p className="text-slate-400 text-sm">El COGS está bien controlado. El negocio tiene fundamentos sólidos de pricing.</p>
                </div>
                <div className="bg-slate-800/50 rounded-xl p-4">
                  <div className="text-emerald-400 font-medium mb-1">Agosto: mejor mes ($1.65M ventas)</div>
                  <p className="text-slate-400 text-sm">Analizar qué funcionó en agosto para replicar estrategias en otros meses.</p>
                </div>
                <div className="bg-slate-800/50 rounded-xl p-4">
                  <div className="text-emerald-400 font-medium mb-1">Descuentos controlados (0.6%)</div>
                  <p className="text-slate-400 text-sm">Los descuentos no están erosionando márgenes significativamente.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recomendaciones Estratégicas */}
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-6">
              <Zap className="w-6 h-6 text-amber-400" />
              <h3 className="text-lg font-semibold text-white">Recomendaciones Estratégicas</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-xl p-5 border border-slate-600/30">
                <div className="text-amber-400 text-sm font-semibold mb-2">CORTO PLAZO</div>
                <h4 className="text-white font-medium mb-2">Optimizar Costos de Cerveza</h4>
                <p className="text-slate-400 text-sm">Negociar descuentos por volumen o buscar proveedores alternativos. Un 5% de reducción = $166K en ahorros anuales.</p>
              </div>
              <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-xl p-5 border border-slate-600/30">
                <div className="text-emerald-400 text-sm font-semibold mb-2">MEDIANO PLAZO</div>
                <h4 className="text-white font-medium mb-2">Estrategia Temporada Baja</h4>
                <p className="text-slate-400 text-sm">Desarrollar promociones o eventos especiales para enero-febrero. Ajustar nómina variable en meses de baja demanda.</p>
              </div>
              <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-xl p-5 border border-slate-600/30">
                <div className="text-rose-400 text-sm font-semibold mb-2">LARGO PLAZO</div>
                <h4 className="text-white font-medium mb-2">Diversificar Ingresos</h4>
                <p className="text-slate-400 text-sm">Explorar eventos privados, catering o mercancía. Reducir dependencia de ventas en piso.</p>
              </div>
            </div>
          </div>

          {/* Análisis de Sensibilidad */}
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
            <h3 className="text-lg font-semibold text-white mb-4">Análisis de Sensibilidad</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-slate-300 font-medium mb-3">Impacto de reducir costos de cerveza:</h4>
                <div className="space-y-2">
                  {[5, 10, 15].map((pct) => {
                    const ahorro = 3334632.06 * (pct / 100);
                    const nuevaUtilidad = kpis.utilidadOperativa + ahorro;
                    return (
                      <div key={pct} className="flex justify-between items-center bg-slate-700/30 rounded-lg px-4 py-2">
                        <span className="text-slate-400">-{pct}% costo cerveza</span>
                        <span className="text-emerald-400 font-medium">+{formatCurrency(ahorro)} utilidad ({(nuevaUtilidad / kpis.ventasTotal * 100).toFixed(1)}% margen)</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div>
                <h4 className="text-slate-300 font-medium mb-3">Impacto de incrementar ventas:</h4>
                <div className="space-y-2">
                  {[10, 15, 20].map((pct) => {
                    const incremento = kpis.ventasTotal * (pct / 100);
                    const margenContribucion = 0.629;
                    const nuevaUtilidad = kpis.utilidadOperativa + (incremento * margenContribucion);
                    return (
                      <div key={pct} className="flex justify-between items-center bg-slate-700/30 rounded-lg px-4 py-2">
                        <span className="text-slate-400">+{pct}% ventas</span>
                        <span className="text-emerald-400 font-medium">+{formatCurrency(incremento * margenContribucion)} utilidad</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Métricas Clave Resumen */}
          <div className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 rounded-2xl p-6 border border-slate-700/50">
            <h3 className="text-lg font-semibold text-white mb-4">Resumen de Métricas Calculadas</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="space-y-2">
                <div className="text-slate-400">Promedio mensual ventas</div>
                <div className="text-white font-bold text-lg">{formatCurrency(kpis.ventasTotal / 11)}</div>
              </div>
              <div className="space-y-2">
                <div className="text-slate-400">Promedio mensual utilidad</div>
                <div className="text-white font-bold text-lg">{formatCurrency(kpis.utilidadOperativa / 11)}</div>
              </div>
              <div className="space-y-2">
                <div className="text-slate-400">Ticket prom. efectivo vs tarjeta</div>
                <div className="text-white font-bold text-lg">46% / 40%</div>
              </div>
              <div className="space-y-2">
                <div className="text-slate-400">Costo por peso vendido</div>
                <div className="text-white font-bold text-lg">${(kpis.costosOperativos / kpis.ventasTotal).toFixed(2)}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-8 text-center text-slate-500 text-sm">
        Dashboard generado con datos reales del Estado de Resultados 2025 · La Pulquería
      </div>
    </div>
  );
};

export default Dashboard;
