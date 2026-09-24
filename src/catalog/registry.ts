import type { CatalogRegistry } from "./types.js";
import { MetricCard, MetricCardSchema } from "./dashboard/MetricCard.js";
import { TrendChart, TrendChartSchema } from "./dashboard/TrendChart.js";
import { DataTable, DataTableSchema } from "./dashboard/DataTable.js";
import { AlertBanner, AlertBannerSchema } from "./dashboard/AlertBanner.js";
import { HeroSection, HeroSectionSchema } from "./marketing/HeroSection.js";
import { FeatureGrid, FeatureGridSchema } from "./marketing/FeatureGrid.js";
import { PricingTable, PricingTableSchema } from "./marketing/PricingTable.js";
import { CTASection, CTASectionSchema } from "./marketing/CTASection.js";

export const defaultCatalog: CatalogRegistry = {
  metric_card: {
    id: "metric_card",
    name: "Thẻ Chỉ Số (MetricCard)",
    category: "dashboard",
    description: "Hiển thị một con số thống kê đơn lẻ kèm xu hướng tăng giảm",
    system1Criteria: "Hiển thị số liệu tổng quan như doanh thu, đơn hàng, người dùng, tỷ lệ chuyển đổi kèm phần trăm tăng giảm",
    schema: MetricCardSchema,
    defaultProps: {
      title: "Tổng Doanh Thu",
      value: "$48,250",
      change: "+14.2%",
      trend: "up",
      period: "so với tuần trước",
      description: "Đạt 112% mục tiêu tháng",
    },
    component: MetricCard,
  },

  trend_chart: {
    id: "trend_chart",
    name: "Biểu Đồ Xu Hướng (TrendChart)",
    category: "dashboard",
    description: "Biểu đồ đường hoặc cột thể hiện biến động dữ liệu theo thời gian",
    system1Criteria: "Biểu đồ trực quan hóa dữ liệu theo thời gian thực, phân tích tăng trưởng, lịch sử doanh số hoặc traffic theo mốc ngày",
    schema: TrendChartSchema,
    defaultProps: {
      title: "Xu Hướng Tăng Trưởng Doanh Số",
      subtitle: "Dữ liệu 7 ngày gần nhất",
      chartType: "line",
      color: "zinc",
      dataPoints: [
        { label: "T2", value: 3200 },
        { label: "T3", value: 4100 },
        { label: "T4", value: 3800 },
        { label: "T5", value: 5200 },
        { label: "T6", value: 6800 },
        { label: "T7", value: 7400 },
        { label: "CN", value: 8900 },
      ],
    },
    component: TrendChart,
  },

  data_table: {
    id: "data_table",
    name: "Bảng Dữ Liệu (DataTable)",
    category: "dashboard",
    description: "Bảng danh sách chi tiết các bản ghi, đơn hàng, logs có tìm kiếm",
    system1Criteria: "Danh sách chi tiết nhiều dòng, bảng quản lý giao dịch, hóa đơn, khách hàng, hoàn tiền hoặc nhật ký hệ thống",
    schema: DataTableSchema,
    defaultProps: {
      title: "Giao Dịch Gần Đây",
      description: "10 giao dịch mới nhất trên toàn hệ thống",
      columns: [
        { key: "id", label: "Mã Đơn", align: "left" },
        { key: "customer", label: "Khách Hàng", align: "left" },
        { key: "amount", label: "Số Tiền", align: "right" },
        { key: "status", label: "Trạng Thái", align: "center" },
      ],
      rows: [
        { id: "#ORD-9021", customer: "Nguyễn Văn A", amount: "$350.00", status: "Thành công" },
        { id: "#ORD-9022", customer: "Trần Thị B", amount: "$1,200.00", status: "Chờ duyệt" },
        { id: "#ORD-9023", customer: "Lê Hoàng C", amount: "$45.00", status: "Thành công" },
        { id: "#ORD-9024", customer: "Phạm Minh D", amount: "$780.00", status: "Thành công" },
      ],
    },
    component: DataTable,
  },

  alert_banner: {
    id: "alert_banner",
    name: "Thông Báo Cảnh Báo (AlertBanner)",
    category: "feedback",
    description: "Khối cảnh báo trạng thái, sự cố hoặc nhắc nhở quan trọng",
    system1Criteria: "Cảnh báo khẩn cấp, thông báo lỗi hệ thống, downtime, bảo trì, thẻ sắp hết hạn hoặc nhắc nhở quan trọng",
    schema: AlertBannerSchema,
    defaultProps: {
      title: "Bảo Trì Hệ Thống Định Kỳ",
      message: "Hệ thống sẽ tạm dừng cập nhật cơ sở dữ liệu từ 02:00 - 03:00 sáng mai.",
      severity: "warning",
      actionLabel: "Xem lịch chi tiết",
      dismissible: true,
    },
    component: AlertBanner,
  },

  hero_section: {
    id: "hero_section",
    name: "Banner Trang Chủ (HeroSection)",
    category: "marketing",
    description: "Khối đầu trang web ấn tượng với tiêu đề lớn, nút kêu gọi và bằng chứng xã hội",
    system1Criteria: "Trang chủ, phần giới thiệu đầu tiên của sản phẩm, landing page, tiêu đề chính thu hút khách hàng và nút đăng ký",
    schema: HeroSectionSchema,
    defaultProps: {
      badge: "Design OS v2.0",
      headline: "Xây Dựng Giao Diện AI Với Tốc Độ Sub-50ms",
      subheadline: "Khung làm việc Generative UI đầu tiên kết hợp System 1 Decision Model và kiến trúc Catalog chuẩn xác tuyệt đối.",
      primaryCtaText: "Bắt đầu miễn phí",
      secondaryCtaText: "Khám phá Catalog",
      socialProof: "Được tin cậy bởi 2,500+ kỹ sư AI trên toàn cầu",
    },
    component: HeroSection,
  },

  feature_grid: {
    id: "feature_grid",
    name: "Lưới Tính Năng (FeatureGrid)",
    category: "marketing",
    description: "3 khối giới thiệu các tính năng hoặc ưu điểm cốt lõi",
    system1Criteria: "Giới thiệu các tính năng nổi bật, lý do chọn sản phẩm, công nghệ cốt lõi hoặc ưu điểm cạnh tranh",
    schema: FeatureGridSchema,
    defaultProps: {
      title: "Tại Sao Chọn Design OS Generative UI?",
      subtitle: "Được thiết kế cho các ứng dụng đòi hỏi tốc độ phản hồi tức thì và độ ổn định cao",
      features: [
        {
          title: "Độ Trễ Sub-10ms",
          description: "Chạy cục bộ trên Apple Silicon qua MLX với thời gian ra quyết định chỉ 6.5ms.",
          icon: "zap",
        },
        {
          title: "Zero Hallucination",
          description: "Gác cổng 100% bằng Zod Schema, triệt tiêu hoàn toàn lỗi vỡ layout hoặc gọi sai component.",
          icon: "shield",
        },
        {
          title: "Tiết Kiệm 70% Chi Phí",
          description: "Mô hình Cascade Router xử lý 70% yêu cầu offline tại máy người dùng mà không cần gọi API.",
          icon: "cpu",
        },
      ],
    },
    component: FeatureGrid,
  },

  pricing_table: {
    id: "pricing_table",
    name: "Bảng Giá Gói Cước (PricingTable)",
    category: "marketing",
    description: "Bảng so sánh các gói giá starter, pro, enterprise",
    system1Criteria: "Bảng giá, báo giá, các gói đăng ký dịch vụ, chi phí bản quyền, nâng cấp tài khoản",
    schema: PricingTableSchema,
    defaultProps: {
      title: "Bảng Giá Minh Bạch, Không Chi Phí Ẩn",
      subtitle: "Bắt đầu miễn phí và nâng cấp khi dự án của bạn phát triển quy mô",
      tiers: [
        {
          name: "Starter",
          price: "$0",
          period: "/tháng",
          description: "Dành cho cá nhân và dự án thử nghiệm",
          features: ["Tối đa 1,000 UI renders/tháng", "Chạy Local Laya Engine", "Hỗ trợ cộng đồng"],
          highlighted: false,
          buttonText: "Bắt đầu ngay",
        },
        {
          name: "Pro",
          price: "$49",
          period: "/tháng",
          description: "Dành cho đội ngũ phát triển sản phẩm chuyên nghiệp",
          features: [
            "Không giới hạn UI renders",
            "Hybrid Cascade Router (Laya + JEV)",
            "Tùy biến Zod Catalog không giới hạn",
            "Hỗ trợ kỹ thuật 24/7",
          ],
          highlighted: true,
          buttonText: "Dùng thử 14 ngày",
        },
        {
          name: "Enterprise",
          price: "Liên hệ",
          period: "",
          description: "Dành cho tổ chức quy mô lớn cần SLA bảo đảm",
          features: ["On-premise deployment", "Tùy chỉnh model System 1 riêng", "SLA 99.99% uptime"],
          highlighted: false,
          buttonText: "Gặp tư vấn viên",
        },
      ],
    },
    component: PricingTable,
  },

  cta_section: {
    id: "cta_section",
    name: "Kêu Gọi Hành Động (CTASection)",
    category: "marketing",
    description: "Khối kết trang màu đen tương phản cao kêu gọi đăng ký",
    system1Criteria: "Kêu gọi chốt đơn, đăng ký nhận tin, tham gia dùng thử ở cuối trang hoặc chuyển đổi khách hàng",
    schema: CTASectionSchema,
    defaultProps: {
      headline: "Sẵn Sàng Trải Nghiệm Generative UI Tốc Độ Ánh Sáng?",
      subheadline: "Tích hợp chỉ với 3 dòng mã TypeScript. Tương thích hoàn toàn với Next.js và Tailwind.",
      buttonText: "Đăng ký truy cập sớm",
      showEmailInput: true,
      guaranteeText: "Không cần thẻ tín dụng • Cài đặt dưới 5 phút",
    },
    component: CTASection,
  },
};
