import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/createContext.jsx';
import API from '../../api/api.jsx';
import { Wifi, Server, MonitorSmartphone, Shield, Globe, Zap, HardDrive, Cpu } from 'lucide-react';

export default function Internet() {
  const { darkMode } = useTheme();
  const color1 = API.color1;
  const color2 = API.color2;
  const [internetData, setInternetData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInternetData = async () => {
      try {
        setError(null);
        const response = await API.get('/api/facilities/slug/internet');
        setInternetData(response.data);
      } catch (error) {
        console.error('Error fetching internet data:', error);
        setError('Failed to load internet facilities information. Please try again later.');
        setInternetData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchInternetData();
  }, []);

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    API.get('/api/facilities/slug/internet')
      .then((response) => {
        setInternetData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching internet data:', error);
        setError('Failed to load internet facilities information. Please try again later.');
        setInternetData(null);
      })
      .finally(() => setLoading(false));
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: color1 }}></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-2xl mx-auto px-6 py-20 text-center">
          <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{error}</p>
          <button
            onClick={handleRetry}
            className="px-6 py-3 rounded-lg text-white font-medium transition-all duration-300 hover:shadow-lg"
            style={{ backgroundColor: color1 }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Computer Labs Data
  const computerLabs = [
    {
      id: 1,
      name: 'Lab1',
      computers: 76,
      specs: 'HP 280 G4 MT Business PC, i5P 16GB (2x8GB) DDR4 2400 DIMM Memory, i1TB 7200RPM SATA 3.5in,HP 125 BLK Wired Keyboard,HP Black 125 Wired Mouse, HP P24v G5 FHD Monitor,Realtek 8822BE Wi-Fi 6 Bluetooth 5.3 WW WLAN,HP P24V G5 FHD Monitor'
    },
    {
      id: 2,
      name: 'Lab2',
      computers: 84,
      specs: 'Dell Vostro Desktop 3910,Intel 7th Generation Core i7-7700,8th Cache, 3.60GHz,8GB DDR4 2400MHz,1TB HDD, Dell Wired Keyboard,Dell Wired Mouse,Dell 19in Round LED Monitor,Dell wireless,1Y07 80z_11(25HD),Qualcomm QCA9565 Bluetooth 4.0'
    },
    {
      id: 3,
      name: 'Lab3',
      computers: 75,
      specs: 'HP Elitec Tower 600G3 SFF,16GB (2x8GB) DDR4 4800 UDIMM Memory,1TB 7200RPM SATA 3.5in,HP 125 BLK Wired Keyboard,HP Black 125 Wired Mouse, HP P24v G5 FHD Monitor,Realtek 8822BE Wi-Fi 6 Bluetooth 5.3 WW WLAN,HP P24V G5 FHD Monitor'
    },
    {
      id: 4,
      name: 'Cyber Security Lab',
      computers: 75,
      specs: 'HP Elitec Tower 600G3 SFF,16GB (2x8GB) DDR4 4800 UDIMM Memory,1TB 7200RPM SATA 3.5in,HP 125 BLK Wired Keyboard,HP Black 125 Wired Mouse, HP P24v G5 FHD Monitor,Realtek 8822BE Wi-Fi 6 Bluetooth 5.3 WW WLAN,HP P24V G5 FHD Monitor'
    },
    {
      id: 5,
      name: 'Network Lab',
      computers: 70,
      specs: 'HP Elitec Tower 600G3 SFF,16GB (2x8GB) DDR4 4800 UDIMM Memory,1TB 7200RPM SATA 3.5in,HP 125 BLK Wired Keyboard,HP Black 125 Wired Mouse, HP P24v G5 FHD Monitor,Realtek 8822BE Wi-Fi 6 Bluetooth 5.3 WW WLAN,HP P24V G5 FHD Monitor'
    }
  ];

  // Server Room Equipment Data
  const serverEquipment = [
    'HPE DL380 Gen11 80PT NC CTO Server, INT Xeon 6 64-M CPU For HPE02, HPE 16GB 1Rx4 PC5-4800B-R Smart Kit X12, HPE 21TB SAS/V 2W 12P BC S12sc HDDs, 8CM 57416, 10GbE 2P Multi 1-OCN3 Adaptor',
    'HPE 800W FS Plat Ht Plg Lh, Power Supply Kit X2',
    'HPE02,HPE27 HPE DL385 GEND+ 80PT CTO SVR, AMD EPYC 7413 CPU for HPE27, HPE 16GB 2Rx8 PC4-3200AA-R Smart Kit*128, HPE 1.2TB SAS 10K 10P 2F BC WW HDD*5, HPE 48OGB SAN MLHD 9PT BC WW 10272',
    'HPE02,HPE27 HPE DL385 GEND+ 80PT CTO SVR, AMD EPYC 7413 CPU for HPE27, HPE 16GB 2Rx8 PC4-3200AA-R Smart Kit*128, HPE 1.2TB SAS 10K 10P 2F BC WW HDD*5, HPE 48OGB SAN MLHD 9PT BC WW 10272',
    'HPE DL380 Gen10 Rack 2 2-Carp Brush Kit,HPE 2xf16 SAS 10K 10P 5OP SC 512sc HD 600 HPE 24OGB SAN Ht 5PT 5C WV ID2 HPE 10GbE 2P BASET 5768100 Adpt HPE 96W Smart Storage Battery 145mm 126, HPE Smart Array Rad3 5 08 Gen10 CHH HPE 1GbE 2p FLR-T 1332 A82c, HPE 800W PS Plat Ht Plg LH Pwr Sply Kit HPE 1U,6Lx 1 svr U6 2pr Support, HPE DV'
  ];

  // HPC Lab Equipment
  const hpcEquipment = [
    'HPE DL380 Gen11 80PT NC CTO Server, 2 x INT Xeon 42 54-HP CPU for HPE, 4 x HPE 64GB 2Rx4 PC5-4800B-R Smart Kit ,3 x HPE 2.4TB SAS 10K 10P 2FF SC S12sc AW HDD, 3 x HPE DL380 Gen11 Backplane,NCSlx24 Gen11 900W Storage Ctrlr, BCM 3719 1Gb 2p BASET OCP Add3r, 2 x HPE BLC 1G2 5P5-, Di Transceivor,2 x HPE 1600W FS Plat Ht Plg LH Pwr Sply Kit, HPE LG Ash 1 svr U6',
    'HPE02,HDA1GLHE DL385 GEN2+ 80PT CTO SVR, AMD EPYC 7413 CPU for HPE27, HPE 32GB 2Rx4 PC4-3200AA R Smart Kit*6, HPE 1.2TB SAS 10K 10P 2F BC WW HDD*5, HPE 48OGB SAN MLHD 9PT BC WW 10272, NVIDIA A100 40GB GPU Module for HPE, HPE 1600W FS Plat Ht Plg LH PS Kit\'2 (2 nos.)'
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Hero Section - Minimal Design */}
      <div className={`py-2 px-6 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-3 border" style={{ backgroundColor: `${color1}1A`, color: color1, borderColor: `${color1}66` }}>
            <Wifi className="w-4 h-4" style={{ color: color1 }} />
            Network Infrastructure
          </div>
          <h1 className={`text-2xl md:text-3xl font-bold mb-3 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            Internet
          </h1>
          <p className={`text-xs md:text-sm max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            High-speed connectivity and advanced computing infrastructure.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto py-8 px-6 max-w-full">
        {/* Internet Overview */}
        <div 
          className={`max-w-full mx-auto mb-12 p-8 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'} shadow-xl border-2 hover:border-opacity-100`}
          style={{ borderColor: `${color1}20` }} 
          onMouseEnter={(e) => e.currentTarget.style.borderColor = color1} 
          onMouseLeave={(e) => e.currentTarget.style.borderColor = `${color1}20`}
        >
          <h2 className="text-3xl font-bold mb-6" style={{ color: color1 }}>
            Campus Network Infrastructure
          </h2>
          <p className={`text-lg leading-relaxed mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            The campus is equipped with an internet bandwidth of 5 Gbps primary and 1 Gbps secondary link (1:1). Internet connectivity is also extended to the boys' and girls' hostels through both wired and wireless connections. More than 250 access points are deployed throughout the campus to provide these services. LAN connectivity is also extended to all the faculty quarters, where over 100 access points are installed. In addition to this, the LAN/Wi-Fi network is connected through all the academic and hostel blocks along with 10-Gbps LAN backbone using multimode fiber media.
          </p>
          <p className={`text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            At present, there are more than 500 computers with 200 high-end laptops and 50 workstations, all equipped with wired connectivity. More than 2,800 users (including staff and students) are connected to the Institute network through proper authentication methods. Around 300 IP phones are installed at various locations inside and outside the campus to ensure easy communication. A 24x7 CCTV surveillance system is also operational on the campus for added security.
          </p>
        </div>

        {/* Key Features Grid */}
        <div className="max-w-full mx-auto mb-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Zap, title: '5 Gbps', subtitle: 'Primary Bandwidth' },
            { icon: Globe, title: '250+', subtitle: 'Access Points' },
            { icon: MonitorSmartphone, title: '2,800+', subtitle: 'Connected Users' },
            { icon: Shield, title: '24/7', subtitle: 'CCTV Surveillance' }
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index}
                className={`p-6 rounded-xl text-center ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl transition-all duration-300 border-2`}
                style={{
                  borderColor: darkMode ? '#374151' : `${color1}33`
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = color1}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = darkMode ? '#374151' : `${color1}33`}
              >
                <div 
                  className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${color1}20` }}
                >
                  <Icon className="w-8 h-8" style={{ color: color1 }} />
                </div>
                <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {item.title}
                </h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {item.subtitle}
                </p>
              </div>
            );
          })}
        </div>

        {/* HPC Facility */}
        <div 
          className={`max-w-full mx-auto mb-12 p-8 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'} shadow-xl border-2 hover:border-opacity-100`}
          style={{ borderColor: `${color1}20` }} 
          onMouseEnter={(e) => e.currentTarget.style.borderColor = color1} 
          onMouseLeave={(e) => e.currentTarget.style.borderColor = `${color1}20`}
        >
          <div className="flex items-center gap-3 mb-6">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${color1}20` }}
            >
              <Cpu className="w-6 h-6" style={{ color: color1 }} />
            </div>
            <h2 className="text-3xl font-bold" style={{ color: color1 }}>
              HPC Facility (Vidhya Vahini Lab)
            </h2>
          </div>
          <p className={`text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            The Institute provides a GPU cluster and computing facility through the Vidya Vahini Lab for research-oriented activities.
          </p>
        </div>

        {/* Server Room */}
        <div 
          className={`max-w-full mx-auto mb-12 p-8 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'} shadow-xl border-2 hover:border-opacity-100`}
          style={{ borderColor: `${color1}20` }} 
          onMouseEnter={(e) => e.currentTarget.style.borderColor = color1} 
          onMouseLeave={(e) => e.currentTarget.style.borderColor = `${color1}20`}
        >
          <div className="flex items-center gap-3 mb-6">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${color1}20` }}
            >
              <Server className="w-6 h-6" style={{ color: color1 }} />
            </div>
            <h2 className="text-3xl font-bold" style={{ color: color1 }}>
              Server Room
            </h2>
          </div>
          <p className={`text-lg leading-relaxed mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            The server room is a key location that provides various IT services for the Institute, such as web services, data storage, SIP, DNS, and more, using the following rack servers.
          </p>
          
          <div className="space-y-3">
            {serverEquipment.map((equipment, index) => (
              <div 
                key={index}
                className={`p-4 rounded-lg border-l-4 transition-all duration-300 ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}
                style={{ borderLeftColor: `${color1}40` }}
                onMouseEnter={(e) => e.currentTarget.style.borderLeftColor = color1}
                onMouseLeave={(e) => e.currentTarget.style.borderLeftColor = `${color1}40`}
              >
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {equipment}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* HPC Labs */}
        <div 
          className={`max-w-full mx-auto mb-12 p-8 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'} shadow-xl border-2 hover:border-opacity-100`}
          style={{ borderColor: `${color1}20` }} 
          onMouseEnter={(e) => e.currentTarget.style.borderColor = color1} 
          onMouseLeave={(e) => e.currentTarget.style.borderColor = `${color1}20`}
        >
          <div className="flex items-center gap-3 mb-6">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${color1}20` }}
            >
              <HardDrive className="w-6 h-6" style={{ color: color1 }} />
            </div>
            <h2 className="text-3xl font-bold" style={{ color: color1 }}>
              HPC Labs
            </h2>
          </div>
          <p className={`text-lg leading-relaxed mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            IIIT Kottayam offers advanced computing facilities to students and faculty to execute complex scientific, engineering, and technical computing performances. The facility has the ability to process data and perform complex discussions at high speeds. The following hardware solutions are currently available on campus:
          </p>
          
          <div className="space-y-3">
            {hpcEquipment.map((equipment, index) => (
              <div 
                key={index}
                className={`p-4 rounded-lg border-l-4 transition-all duration-300 ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}
                style={{ borderLeftColor: `${color1}40` }}
                onMouseEnter={(e) => e.currentTarget.style.borderLeftColor = color1}
                onMouseLeave={(e) => e.currentTarget.style.borderLeftColor = `${color1}40`}
              >
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {equipment}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Computer Labs Table */}
        <div className="max-w-full mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: color1 }}>
            Computer Labs
          </h2>
          
          <div 
            className={`rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'} border-2 hover:border-opacity-100`}
            style={{ borderColor: `${color1}20` }} 
            onMouseEnter={(e) => e.currentTarget.style.borderColor = color1} 
            onMouseLeave={(e) => e.currentTarget.style.borderColor = `${color1}20`}
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr 
                    className="text-white"
                    style={{ background: `linear-gradient(135deg, ${color1}, ${color1}dd)` }}
                  >
                    <th className="p-4 text-left font-bold">Lab Name</th>
                    <th className="p-4 text-center font-bold">Number of Computers</th>
                    <th className="p-4 text-left font-bold">Specification</th>
                  </tr>
                </thead>
                <tbody>
                  {computerLabs.map((lab) => (
                    <tr 
                      key={lab.id}
                      className={`border-b transition-colors duration-200 ${darkMode ? 'border-gray-700 hover:bg-gray-700/50' : 'border-gray-200 hover:bg-gray-50'}`}
                    >
                      <td className={`p-4 font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {lab.name}
                      </td>
                      <td className={`p-4 text-center font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {lab.computers}
                      </td>
                      <td className={`p-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {lab.specs}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}