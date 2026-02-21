import { useState, useEffect, useCallback } from "react";

/* ═══════════════════════════════════════════
   DATA: ML Algorithm Tree
   ═══════════════════════════════════════════ */
const ML_TREE = {
  id: "root",
  name: "Machine Learning",
  icon: "🧠",
  children: [
    {
      id: "supervised",
      name: "Supervised Learning",
      icon: "🎯",
      desc: "Learn from labeled data",
      children: [
        {
          id: "classification",
          name: "Classification",
          icon: "🏷️",
          desc: "Predict discrete categories",
          children: [
            { id: "logistic_regression", name: "Logistic Regression", icon: "📈", desc: "Linear model for binary/multi-class classification", tags: ["classification","tabular","small","medium","interpretable","binary","multiclass"], pros: ["Fast training","Highly interpretable","Good baseline"], cons: ["Assumes linearity","Poor with complex boundaries"], complexity: "Low" },
            { id: "decision_tree_c", name: "Decision Tree", icon: "🌳", desc: "Tree-based splitting rules for classification", tags: ["classification","tabular","small","medium","interpretable","binary","multiclass"], pros: ["Very interpretable","Handles non-linear data","No scaling needed"], cons: ["Prone to overfitting","Unstable"], complexity: "Low" },
            { id: "random_forest_c", name: "Random Forest", icon: "🌲", desc: "Ensemble of decision trees for robust classification", tags: ["classification","tabular","medium","large","binary","multiclass","robust"], pros: ["Robust","Handles missing data","Feature importance"], cons: ["Less interpretable","Slower than single tree"], complexity: "Medium" },
            { id: "svm", name: "Support Vector Machine", icon: "⚔️", desc: "Finds optimal hyperplane separating classes", tags: ["classification","tabular","small","medium","binary","high_dimensional"], pros: ["Effective in high dimensions","Memory efficient"], cons: ["Slow on large datasets","Sensitive to scaling"], complexity: "Medium" },
            { id: "knn_c", name: "K-Nearest Neighbors", icon: "👥", desc: "Classify based on closest training examples", tags: ["classification","tabular","small","binary","multiclass","interpretable"], pros: ["Simple","No training phase","Non-parametric"], cons: ["Slow prediction","Curse of dimensionality"], complexity: "Low" },
            { id: "naive_bayes", name: "Naive Bayes", icon: "📊", desc: "Probabilistic classifier using Bayes theorem", tags: ["classification","text","small","medium","binary","multiclass","interpretable","fast"], pros: ["Very fast","Works well with text","Good with small data"], cons: ["Assumes feature independence","Can be outperformed"], complexity: "Low" },
            { id: "xgboost_c", name: "XGBoost / LightGBM", icon: "🚀", desc: "Gradient boosted trees — competition winner", tags: ["classification","tabular","medium","large","binary","multiclass","robust","high_performance"], pros: ["State-of-art for tabular","Handles missing values","Fast"], cons: ["Requires tuning","Less interpretable"], complexity: "Medium" },
            { id: "nn_c", name: "Neural Network (MLP)", icon: "🔮", desc: "Multi-layer perceptron for complex classification", tags: ["classification","tabular","image","text","large","binary","multiclass","complex"], pros: ["Handles complex patterns","Flexible architecture"], cons: ["Needs lots of data","Hard to interpret","Slow training"], complexity: "High" },
          ],
        },
        {
          id: "regression",
          name: "Regression",
          icon: "📉",
          desc: "Predict continuous values",
          children: [
            { id: "linear_regression", name: "Linear Regression", icon: "📐", desc: "Fit a line/plane to predict continuous output", tags: ["regression","tabular","small","medium","interpretable","continuous"], pros: ["Fast","Interpretable","Good baseline"], cons: ["Assumes linearity","Sensitive to outliers"], complexity: "Low" },
            { id: "ridge_lasso", name: "Ridge / Lasso / ElasticNet", icon: "🎛️", desc: "Regularized linear regression variants", tags: ["regression","tabular","small","medium","interpretable","continuous","high_dimensional"], pros: ["Prevents overfitting","Feature selection (Lasso)"], cons: ["Still linear","Need to tune regularization"], complexity: "Low" },
            { id: "decision_tree_r", name: "Decision Tree Regressor", icon: "🌳", desc: "Tree-based splitting for regression tasks", tags: ["regression","tabular","small","medium","interpretable","continuous"], pros: ["Interpretable","Non-linear","No scaling needed"], cons: ["Overfitting","Piecewise constant predictions"], complexity: "Low" },
            { id: "random_forest_r", name: "Random Forest Regressor", icon: "🌲", desc: "Ensemble trees for regression", tags: ["regression","tabular","medium","large","continuous","robust"], pros: ["Robust","Feature importance","Good generalization"], cons: ["Cannot extrapolate","Memory heavy"], complexity: "Medium" },
            { id: "xgboost_r", name: "XGBoost / LightGBM Regressor", icon: "🚀", desc: "Gradient boosted trees for regression", tags: ["regression","tabular","medium","large","continuous","high_performance"], pros: ["Top performer on tabular data","Handles missing values"], cons: ["Requires hyperparameter tuning","Can overfit"], complexity: "Medium" },
            { id: "svr", name: "Support Vector Regression", icon: "⚔️", desc: "SVM adapted for regression tasks", tags: ["regression","tabular","small","medium","continuous","high_dimensional"], pros: ["Works in high dimensions","Robust to outliers"], cons: ["Slow on large data","Hard to tune"], complexity: "Medium" },
            { id: "nn_r", name: "Neural Network Regressor", icon: "🔮", desc: "Deep learning for complex regression", tags: ["regression","tabular","image","large","continuous","complex"], pros: ["Handles complex patterns","Flexible"], cons: ["Needs lots of data","Black box"], complexity: "High" },
          ],
        },
      ],
    },
    {
      id: "unsupervised",
      name: "Unsupervised Learning",
      icon: "🔍",
      desc: "Find patterns in unlabeled data",
      children: [
        {
          id: "clustering",
          name: "Clustering",
          icon: "🫧",
          desc: "Group similar data points",
          children: [
            { id: "kmeans", name: "K-Means", icon: "⭕", desc: "Partition data into K spherical clusters", tags: ["clustering","tabular","medium","large","fast"], pros: ["Fast","Scalable","Simple"], cons: ["Must specify K","Assumes spherical clusters"], complexity: "Low" },
            { id: "dbscan", name: "DBSCAN", icon: "🌀", desc: "Density-based clustering — finds arbitrary shapes", tags: ["clustering","tabular","medium","spatial","anomaly"], pros: ["No K needed","Finds outliers","Arbitrary shapes"], cons: ["Sensitive to parameters","Struggles with varying density"], complexity: "Medium" },
            { id: "hierarchical", name: "Hierarchical Clustering", icon: "🏔️", desc: "Builds a tree of nested clusters", tags: ["clustering","tabular","small","medium","interpretable"], pros: ["Dendrogram visualization","No K needed upfront"], cons: ["Slow on large data","Irreversible merges"], complexity: "Medium" },
            { id: "gmm", name: "Gaussian Mixture Model", icon: "🎪", desc: "Probabilistic clustering with soft assignments", tags: ["clustering","tabular","medium","probabilistic"], pros: ["Soft assignments","Flexible cluster shapes"], cons: ["Sensitive to initialization","Assumes Gaussian"], complexity: "Medium" },
          ],
        },
        {
          id: "dim_reduction",
          name: "Dimensionality Reduction",
          icon: "🔬",
          desc: "Reduce feature space",
          children: [
            { id: "pca", name: "PCA", icon: "📏", desc: "Linear projection to principal components", tags: ["dimensionality_reduction","tabular","image","medium","large","fast"], pros: ["Fast","Removes correlated features","Noise reduction"], cons: ["Linear only","Hard to interpret components"], complexity: "Low" },
            { id: "tsne", name: "t-SNE", icon: "🎨", desc: "Non-linear visualization in 2D/3D", tags: ["dimensionality_reduction","tabular","image","medium","visualization"], pros: ["Great for visualization","Captures non-linear structure"], cons: ["Slow","Non-deterministic","Only for visualization"], complexity: "Medium" },
            { id: "umap", name: "UMAP", icon: "🗺️", desc: "Fast non-linear dimensionality reduction", tags: ["dimensionality_reduction","tabular","image","medium","large","visualization"], pros: ["Faster than t-SNE","Preserves global structure"], cons: ["Hyperparameter sensitive","Relatively new"], complexity: "Medium" },
            { id: "autoencoder", name: "Autoencoder", icon: "🔄", desc: "Neural network for learned representations", tags: ["dimensionality_reduction","image","text","large","complex"], pros: ["Non-linear","Learned representations","Flexible"], cons: ["Needs lots of data","Hard to train"], complexity: "High" },
          ],
        },
        {
          id: "anomaly",
          name: "Anomaly Detection",
          icon: "⚠️",
          desc: "Identify unusual data points",
          children: [
            { id: "isolation_forest", name: "Isolation Forest", icon: "🏝️", desc: "Isolate anomalies using random partitioning", tags: ["anomaly","tabular","medium","large","fast"], pros: ["Fast","Scalable","No assumptions"], cons: ["Threshold selection","May miss local anomalies"], complexity: "Low" },
            { id: "one_class_svm", name: "One-Class SVM", icon: "🛡️", desc: "SVM boundary around normal data", tags: ["anomaly","tabular","small","medium","high_dimensional"], pros: ["Effective in high dimensions"], cons: ["Slow","Sensitive to hyperparameters"], complexity: "Medium" },
            { id: "lof", name: "Local Outlier Factor", icon: "📍", desc: "Density-based local anomaly detection", tags: ["anomaly","tabular","small","medium"], pros: ["Detects local anomalies","Density aware"], cons: ["Slow on large data","Parameter sensitive"], complexity: "Medium" },
          ],
        },
      ],
    },
    {
      id: "deep_learning",
      name: "Deep Learning",
      icon: "🧬",
      desc: "Neural networks with many layers",
      children: [
        {
          id: "cv",
          name: "Computer Vision",
          icon: "👁️",
          desc: "Image and video understanding",
          children: [
            { id: "cnn", name: "CNN (ConvNet)", icon: "🖼️", desc: "Convolutional networks for image tasks", tags: ["classification","image","large","complex","high_performance"], pros: ["State-of-art for images","Transfer learning available"], cons: ["Needs GPU","Lots of data needed"], complexity: "High" },
            { id: "resnet", name: "ResNet / EfficientNet", icon: "🏗️", desc: "Deep residual networks for image classification", tags: ["classification","image","large","complex","high_performance","pretrained"], pros: ["Pretrained models available","Very deep networks"], cons: ["Heavy compute","Large models"], complexity: "High" },
            { id: "yolo", name: "YOLO / Object Detection", icon: "🎯", desc: "Real-time object detection in images", tags: ["detection","image","large","complex","real_time"], pros: ["Real-time speed","End-to-end"], cons: ["Struggles with small objects","Needs annotated data"], complexity: "High" },
            { id: "unet", name: "U-Net / Segmentation", icon: "✂️", desc: "Pixel-level image segmentation", tags: ["segmentation","image","large","complex","medical"], pros: ["Precise boundaries","Works with small datasets"], cons: ["Slow inference","Complex architecture"], complexity: "High" },
          ],
        },
        {
          id: "nlp",
          name: "Natural Language Processing",
          icon: "💬",
          desc: "Text and language understanding",
          children: [
            { id: "rnn_lstm", name: "RNN / LSTM / GRU", icon: "🔁", desc: "Recurrent networks for sequential text", tags: ["classification","regression","text","sequence","medium","large"], pros: ["Handles sequences","Variable length input"], cons: ["Slow training","Vanishing gradients"], complexity: "High" },
            { id: "transformer", name: "Transformer / BERT / GPT", icon: "⚡", desc: "Attention-based models — current state of the art", tags: ["classification","text","large","complex","high_performance","pretrained"], pros: ["State-of-art NLP","Transfer learning","Pretrained"], cons: ["Very heavy compute","Massive data needed"], complexity: "Very High" },
            { id: "word2vec", name: "Word2Vec / GloVe", icon: "📝", desc: "Word embedding representations", tags: ["dimensionality_reduction","text","medium","large"], pros: ["Captures semantics","Reusable embeddings"], cons: ["No context awareness","Fixed representations"], complexity: "Medium" },
          ],
        },
        {
          id: "generative",
          name: "Generative Models",
          icon: "🎭",
          desc: "Generate new data samples",
          children: [
            { id: "gan", name: "GAN", icon: "🖌️", desc: "Generative Adversarial Networks for data generation", tags: ["generation","image","large","complex"], pros: ["High quality outputs","Creative applications"], cons: ["Hard to train","Mode collapse"], complexity: "Very High" },
            { id: "vae", name: "VAE", icon: "🧪", desc: "Variational Autoencoder for structured generation", tags: ["generation","image","tabular","large","complex","probabilistic"], pros: ["Smooth latent space","Principled framework"], cons: ["Blurry outputs","Complex math"], complexity: "High" },
            { id: "diffusion", name: "Diffusion Models", icon: "🌊", desc: "Iterative denoising for high-quality generation", tags: ["generation","image","large","complex","high_performance"], pros: ["Highest quality generation","Stable training"], cons: ["Very slow inference","Massive compute"], complexity: "Very High" },
          ],
        },
      ],
    },
    {
      id: "reinforcement",
      name: "Reinforcement Learning",
      icon: "🎮",
      desc: "Learn through trial and error",
      children: [
        { id: "q_learning", name: "Q-Learning / DQN", icon: "🎲", desc: "Value-based RL for discrete actions", tags: ["reinforcement","sequential","medium","discrete_actions"], pros: ["Simple concept","Works for discrete actions"], cons: ["Discrete actions only","Sample inefficient"], complexity: "Medium" },
        { id: "policy_gradient", name: "Policy Gradient / PPO / A3C", icon: "🧭", desc: "Policy-based RL for continuous control", tags: ["reinforcement","sequential","large","continuous_actions","complex"], pros: ["Continuous actions","Stochastic policies"], cons: ["High variance","Slow convergence"], complexity: "High" },
        { id: "multi_agent", name: "Multi-Agent RL", icon: "🤝", desc: "Multiple agents learning simultaneously", tags: ["reinforcement","sequential","large","complex","multi_agent"], pros: ["Emergent behavior","Complex environments"], cons: ["Very hard to train","Non-stationary"], complexity: "Very High" },
      ],
    },
  ],
};

/* ═══════════════════════════════════════════
   DATA: Industry Use Cases
   ═══════════════════════════════════════════ */
const INDUSTRIES = [
  {
    id: "banking",
    name: "Banking & Financial Services",
    icon: "🏦",
    color: "#22D3EE",
    gradient: "linear-gradient(135deg, #083344 0%, #164E63 100%)",
    useCases: [
      { title: "Fraud Detection", desc: "Real-time identification of fraudulent transactions using pattern recognition on transaction data", algorithms: ["XGBoost / LightGBM", "Isolation Forest", "Random Forest", "Neural Network (MLP)", "Local Outlier Factor"], impact: "Reduces fraud losses by 40-60%", dataType: "Tabular / Time-series" },
      { title: "Credit Risk Scoring", desc: "Predict the probability of a borrower defaulting on a loan using historical financial data", algorithms: ["Logistic Regression", "XGBoost / LightGBM", "Random Forest", "Neural Network (MLP)"], impact: "Improves loan approval accuracy by 25-35%", dataType: "Tabular" },
      { title: "Customer Churn Prediction", desc: "Identify customers likely to close accounts or switch banks based on behavioral signals", algorithms: ["Random Forest", "XGBoost / LightGBM", "Logistic Regression", "K-Nearest Neighbors"], impact: "Reduces churn by 15-25% with proactive retention", dataType: "Tabular" },
      { title: "Algorithmic Trading", desc: "Automated trading strategies using market data patterns and reinforcement learning", algorithms: ["Q-Learning / DQN", "Policy Gradient / PPO / A3C", "RNN / LSTM / GRU", "Transformer / BERT / GPT"], impact: "Generates alpha and reduces execution costs", dataType: "Time-series / Sequential" },
      { title: "Anti-Money Laundering (AML)", desc: "Detect suspicious transaction patterns and networks indicative of money laundering", algorithms: ["Isolation Forest", "DBSCAN", "Random Forest", "XGBoost / LightGBM", "One-Class SVM"], impact: "Reduces false positives by 50-70%", dataType: "Tabular / Graph" },
    ],
  },
  {
    id: "retail",
    name: "Retail & E-Commerce",
    icon: "🛒",
    color: "#F472B6",
    gradient: "linear-gradient(135deg, #4C1130 0%, #831843 100%)",
    useCases: [
      { title: "Product Recommendation", desc: "Personalized product suggestions based on browsing history, purchases, and similar user behavior", algorithms: ["K-Nearest Neighbors", "Random Forest", "Neural Network (MLP)", "Transformer / BERT / GPT", "K-Means"], impact: "Increases revenue per user by 10-30%", dataType: "Tabular / Text" },
      { title: "Demand Forecasting", desc: "Predict future product demand to optimize inventory levels and reduce stockouts", algorithms: ["XGBoost / LightGBM Regressor", "RNN / LSTM / GRU", "Random Forest Regressor", "Linear Regression"], impact: "Reduces inventory costs by 20-30%", dataType: "Time-series / Tabular" },
      { title: "Customer Segmentation", desc: "Group customers into meaningful segments for targeted marketing campaigns", algorithms: ["K-Means", "DBSCAN", "Gaussian Mixture Model", "Hierarchical Clustering", "PCA"], impact: "Improves campaign ROI by 25-40%", dataType: "Tabular" },
      { title: "Price Optimization", desc: "Dynamic pricing strategies based on demand elasticity, competition, and market conditions", algorithms: ["XGBoost / LightGBM Regressor", "Linear Regression", "Q-Learning / DQN", "Random Forest Regressor"], impact: "Increases margins by 5-15%", dataType: "Tabular / Time-series" },
      { title: "Visual Search & Product Matching", desc: "Allow customers to search for products using images instead of text queries", algorithms: ["CNN (ConvNet)", "ResNet / EfficientNet", "Autoencoder", "t-SNE"], impact: "Increases conversion by 10-20%", dataType: "Image" },
    ],
  },
  {
    id: "healthcare",
    name: "Healthcare & Life Sciences",
    icon: "🏥",
    color: "#34D399",
    gradient: "linear-gradient(135deg, #022C22 0%, #064E3B 100%)",
    useCases: [
      { title: "Disease Diagnosis from Imaging", desc: "Detect conditions like tumors, fractures, and retinal diseases from medical images (X-rays, MRIs, CT scans)", algorithms: ["CNN (ConvNet)", "ResNet / EfficientNet", "U-Net / Segmentation", "YOLO / Object Detection"], impact: "Achieves radiologist-level accuracy in many tasks", dataType: "Image" },
      { title: "Drug Discovery & Molecular Design", desc: "Predict molecular properties and generate novel drug candidates using AI", algorithms: ["GAN", "VAE", "Random Forest", "Neural Network (MLP)", "Transformer / BERT / GPT"], impact: "Reduces drug discovery timeline by 30-50%", dataType: "Tabular / Molecular" },
      { title: "Patient Readmission Prediction", desc: "Predict which patients are likely to be readmitted within 30 days of discharge", algorithms: ["XGBoost / LightGBM", "Random Forest", "Logistic Regression", "Neural Network (MLP)"], impact: "Reduces readmissions by 15-25%", dataType: "Tabular" },
      { title: "Clinical NLP & Record Analysis", desc: "Extract structured information from unstructured clinical notes and medical records", algorithms: ["Transformer / BERT / GPT", "RNN / LSTM / GRU", "Naive Bayes", "Word2Vec / GloVe"], impact: "Saves 3-5 hours of clinician time per day", dataType: "Text" },
      { title: "Genomic Risk Prediction", desc: "Predict disease susceptibility and treatment response from genetic data", algorithms: ["Random Forest", "XGBoost / LightGBM", "PCA", "Neural Network (MLP)", "Support Vector Machine"], impact: "Enables precision medicine approaches", dataType: "Tabular / High-dimensional" },
    ],
  },
  {
    id: "manufacturing",
    name: "Manufacturing & Industrial",
    icon: "🏭",
    color: "#FB923C",
    gradient: "linear-gradient(135deg, #431407 0%, #7C2D12 100%)",
    useCases: [
      { title: "Predictive Maintenance", desc: "Predict equipment failures before they happen using sensor data and historical maintenance records", algorithms: ["XGBoost / LightGBM", "Random Forest", "RNN / LSTM / GRU", "Isolation Forest", "One-Class SVM"], impact: "Reduces unplanned downtime by 30-50%", dataType: "Time-series / Tabular" },
      { title: "Quality Control & Defect Detection", desc: "Automatically detect product defects on the assembly line using computer vision", algorithms: ["CNN (ConvNet)", "ResNet / EfficientNet", "YOLO / Object Detection", "U-Net / Segmentation"], impact: "Catches 95%+ of defects, reduces waste by 20%", dataType: "Image" },
      { title: "Supply Chain Optimization", desc: "Optimize logistics, routing, and inventory across the supply chain", algorithms: ["XGBoost / LightGBM Regressor", "Q-Learning / DQN", "Linear Regression", "K-Means"], impact: "Reduces logistics costs by 10-20%", dataType: "Tabular / Sequential" },
      { title: "Process Optimization", desc: "Optimize manufacturing parameters like temperature, pressure, and speed for maximum yield", algorithms: ["Random Forest Regressor", "XGBoost / LightGBM Regressor", "Policy Gradient / PPO / A3C", "Neural Network Regressor"], impact: "Improves yield by 5-15%", dataType: "Tabular / Time-series" },
      { title: "Energy Consumption Forecasting", desc: "Predict and optimize energy usage across manufacturing facilities", algorithms: ["RNN / LSTM / GRU", "XGBoost / LightGBM Regressor", "Random Forest Regressor", "Linear Regression"], impact: "Reduces energy costs by 10-20%", dataType: "Time-series" },
    ],
  },
  {
    id: "insurance",
    name: "Insurance",
    icon: "🛡️",
    color: "#A78BFA",
    gradient: "linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)",
    useCases: [
      { title: "Claims Fraud Detection", desc: "Identify fraudulent insurance claims using pattern analysis on claims data and text", algorithms: ["XGBoost / LightGBM", "Random Forest", "Isolation Forest", "Naive Bayes", "Neural Network (MLP)"], impact: "Saves 5-10% of total claims payouts", dataType: "Tabular / Text" },
      { title: "Risk Pricing & Underwriting", desc: "Accurately price insurance policies based on individual risk profiles", algorithms: ["XGBoost / LightGBM Regressor", "Logistic Regression", "Random Forest", "Ridge / Lasso / ElasticNet"], impact: "Improves loss ratios by 3-8%", dataType: "Tabular" },
      { title: "Claims Processing Automation", desc: "Auto-classify, route, and estimate claims using NLP and image analysis", algorithms: ["Transformer / BERT / GPT", "CNN (ConvNet)", "Naive Bayes", "Random Forest"], impact: "Reduces processing time by 50-70%", dataType: "Text / Image" },
      { title: "Customer Lifetime Value", desc: "Predict the total value a customer will bring over their relationship with the insurer", algorithms: ["XGBoost / LightGBM Regressor", "Random Forest Regressor", "Linear Regression", "Neural Network Regressor"], impact: "Improves retention targeting by 20-30%", dataType: "Tabular" },
      { title: "Catastrophe Modeling", desc: "Predict losses from natural disasters using climate, geographic, and portfolio data", algorithms: ["Random Forest Regressor", "Neural Network Regressor", "XGBoost / LightGBM Regressor", "Gaussian Mixture Model"], impact: "Improves reserve accuracy by 15-25%", dataType: "Tabular / Spatial" },
    ],
  },
  {
    id: "telecom",
    name: "Telecommunications",
    icon: "📡",
    color: "#FBBF24",
    gradient: "linear-gradient(135deg, #422006 0%, #713F12 100%)",
    useCases: [
      { title: "Network Anomaly Detection", desc: "Detect network intrusions, outages, and performance degradation in real-time", algorithms: ["Isolation Forest", "DBSCAN", "One-Class SVM", "RNN / LSTM / GRU", "Local Outlier Factor"], impact: "Reduces mean time to detect by 60%", dataType: "Time-series / Tabular" },
      { title: "Customer Churn Prevention", desc: "Predict and prevent subscriber churn with targeted interventions", algorithms: ["XGBoost / LightGBM", "Random Forest", "Logistic Regression", "Neural Network (MLP)"], impact: "Reduces churn by 15-25%", dataType: "Tabular" },
      { title: "Network Capacity Planning", desc: "Forecast bandwidth demand and optimize network resource allocation", algorithms: ["RNN / LSTM / GRU", "XGBoost / LightGBM Regressor", "Random Forest Regressor", "Linear Regression"], impact: "Optimizes CAPEX spending by 15-20%", dataType: "Time-series" },
      { title: "Call Center Optimization", desc: "Route calls intelligently and predict call volumes for better staffing", algorithms: ["K-Means", "XGBoost / LightGBM", "Transformer / BERT / GPT", "Random Forest"], impact: "Reduces wait time by 30-40%", dataType: "Tabular / Text" },
      { title: "Personalized Plan Recommendations", desc: "Suggest optimal service plans based on usage patterns and preferences", algorithms: ["K-Nearest Neighbors", "Random Forest", "K-Means", "Gaussian Mixture Model"], impact: "Increases ARPU by 8-15%", dataType: "Tabular" },
    ],
  },
];

/* ═══════════════════════════════════════════
   DATA: Wizard Questions
   ═══════════════════════════════════════════ */
const QUESTIONS = [
  { id: "task", question: "What is your primary task?", options: [
    { label: "Predict a category", value: "classification", icon: "🏷️" },
    { label: "Predict a number", value: "regression", icon: "📉" },
    { label: "Group similar items", value: "clustering", icon: "🫧" },
    { label: "Detect outliers", value: "anomaly", icon: "⚠️" },
    { label: "Reduce features", value: "dimensionality_reduction", icon: "🔬" },
    { label: "Generate new data", value: "generation", icon: "🎭" },
    { label: "Sequential decisions (RL)", value: "reinforcement", icon: "🎮" },
    { label: "Detect objects in images", value: "detection", icon: "🎯" },
    { label: "Segment images", value: "segmentation", icon: "✂️" },
  ]},
  { id: "data_type", question: "What type of data do you have?", options: [
    { label: "Tabular / Structured", value: "tabular", icon: "📊" },
    { label: "Images / Video", value: "image", icon: "🖼️" },
    { label: "Text / NLP", value: "text", icon: "💬" },
    { label: "Time Series", value: "sequence", icon: "📈" },
  ]},
  { id: "data_size", question: "How much data do you have?", options: [
    { label: "Small (< 1K)", value: "small", icon: "🔹" },
    { label: "Medium (1K – 100K)", value: "medium", icon: "🔷" },
    { label: "Large (100K+)", value: "large", icon: "💎" },
  ]},
  { id: "priority", question: "What matters most?", options: [
    { label: "Interpretability", value: "interpretable", icon: "🔍" },
    { label: "Maximum accuracy", value: "high_performance", icon: "🏆" },
    { label: "Speed", value: "fast", icon: "⚡" },
    { label: "Robustness", value: "robust", icon: "🛡️" },
  ]},
];

function getAllLeaves(node) {
  if (!node.children) return [node];
  return node.children.flatMap(getAllLeaves);
}

function scoreAlgorithms(answers) {
  return getAllLeaves(ML_TREE)
    .map((algo) => {
      let score = 0;
      const tags = algo.tags || [];
      Object.values(answers).forEach((val) => { if (tags.includes(val)) score += 25; });
      return { ...algo, score };
    })
    .filter((a) => a.score > 0)
    .sort((a, b) => b.score - a.score);
}

/* ═══════════════════════════════════════════
   THEME COLORS
   ═══════════════════════════════════════════ */
const BRANCH_COLORS = {
  supervised: { accent: "#22D3EE", glow: "rgba(34,211,238,0.08)" },
  unsupervised: { accent: "#A78BFA", glow: "rgba(167,139,250,0.08)" },
  deep_learning: { accent: "#F472B6", glow: "rgba(244,114,182,0.08)" },
  reinforcement: { accent: "#FBBF24", glow: "rgba(251,191,36,0.08)" },
};

function getBranchColor(node, parent) {
  if (BRANCH_COLORS[node.id]) return BRANCH_COLORS[node.id];
  if (parent && BRANCH_COLORS[parent.id]) return BRANCH_COLORS[parent.id];
  return { accent: "#94A3B8", glow: "rgba(148,163,184,0.08)" };
}

/* ═══════════════════════════════════════════
   COMPONENTS
   ═══════════════════════════════════════════ */

function TreeNode({ node, depth = 0, parent = null, onSelect, expanded, toggleExpand }) {
  const color = getBranchColor(node, parent);
  const parentColor = parent ? getBranchColor(parent, null) : color;
  const c = depth <= 1 ? color : parentColor;
  const hasKids = node.children?.length > 0;
  const isLeaf = !hasKids;
  const open = expanded[node.id];

  const sizes = { pad: depth === 0 ? "12px 16px" : depth === 1 ? "10px 16px" : "8px 12px", font: depth === 0 ? 16 : depth === 1 ? 14 : 13, icon: depth === 0 ? 22 : depth === 1 ? 18 : 15, weight: depth <= 1 ? 700 : isLeaf ? 500 : 600 };

  return (
    <div style={{ marginLeft: depth <= 1 ? 0 : 16 }}>
      <div
        onClick={() => isLeaf ? onSelect(node) : toggleExpand(node.id)}
        style={{
          display: "flex", alignItems: "center", gap: 10, padding: sizes.pad, marginBottom: 2, borderRadius: 8,
          cursor: "pointer", background: open ? c.glow : "transparent",
          border: `1px solid ${open ? c.accent + "30" : "transparent"}`, transition: "all 0.2s",
        }}
        onMouseEnter={(e) => { if (!open) { e.currentTarget.style.background = c.glow; e.currentTarget.style.borderColor = c.accent + "20"; }}}
        onMouseLeave={(e) => { if (!open) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "transparent"; }}}
      >
        <span style={{ fontSize: sizes.icon, lineHeight: 1 }}>{node.icon}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: sizes.font, fontWeight: sizes.weight, color: depth === 0 ? "#F1F5F9" : c.accent, fontFamily: "var(--font-display)", letterSpacing: depth === 0 ? "0.3px" : 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {node.name}
          </div>
          {node.desc && depth > 0 && <div style={{ fontSize: 11, color: "#64748B", marginTop: 1 }}>{node.desc}</div>}
        </div>
        {hasKids && <span style={{ color: c.accent, fontSize: 10, transition: "transform 0.2s", transform: open ? "rotate(90deg)" : "rotate(0)", display: "inline-block", opacity: 0.7 }}>▶</span>}
        {isLeaf && node.complexity && (
          <span style={{ fontSize: 9, padding: "2px 8px", borderRadius: 99, background: c.accent + "18", color: c.accent, fontWeight: 600, fontFamily: "var(--font-display)", whiteSpace: "nowrap" }}>{node.complexity}</span>
        )}
      </div>
      {hasKids && open && (
        <div style={{ borderLeft: `1.5px solid ${c.accent}15`, marginLeft: depth === 0 ? 11 : 16, paddingLeft: 4, animation: "fadeSlide 0.2s ease" }}>
          {node.children.map((child) => (
            <TreeNode key={child.id} node={child} depth={depth + 1} parent={depth <= 1 ? node : parent} onSelect={onSelect} expanded={expanded} toggleExpand={toggleExpand} />
          ))}
        </div>
      )}
    </div>
  );
}

function DetailModal({ algo, onClose }) {
  if (!algo) return null;
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.65)", backdropFilter: "blur(10px)", animation: "fadeIn 0.15s ease" }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: "linear-gradient(160deg, #0C1222 0%, #151D30 100%)", border: "1px solid rgba(148,163,184,0.15)", borderRadius: 14, padding: "28px 28px 24px", maxWidth: 500, width: "92%", boxShadow: "0 30px 80px rgba(0,0,0,0.6)", animation: "scaleIn 0.2s ease" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
          <div>
            <span style={{ fontSize: 32 }}>{algo.icon}</span>
            <h2 style={{ color: "#F1F5F9", fontSize: 20, margin: "6px 0 4px", fontFamily: "var(--font-display)", fontWeight: 700 }}>{algo.name}</h2>
            <p style={{ color: "#94A3B8", fontSize: 13, margin: 0, lineHeight: 1.5 }}>{algo.desc}</p>
          </div>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.06)", border: "none", color: "#64748B", fontSize: 16, cursor: "pointer", borderRadius: 6, width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>✕</button>
        </div>
        {algo.complexity && (
          <div style={{ display: "inline-block", marginTop: 12, padding: "3px 10px", borderRadius: 99, background: "rgba(148,163,184,0.1)", color: "#94A3B8", fontSize: 11, fontWeight: 600, fontFamily: "var(--font-display)" }}>
            Complexity: {algo.complexity}
          </div>
        )}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 20 }}>
          <div>
            <h4 style={{ color: "#34D399", fontSize: 11, marginBottom: 8, fontFamily: "var(--font-display)", letterSpacing: "0.5px" }}>✓ STRENGTHS</h4>
            {(algo.pros || []).map((p, i) => <div key={i} style={{ color: "#CBD5E1", fontSize: 12, padding: "3px 0 3px 12px", position: "relative", lineHeight: 1.5 }}><span style={{ position: "absolute", left: 0, color: "#34D399" }}>›</span>{p}</div>)}
          </div>
          <div>
            <h4 style={{ color: "#F87171", fontSize: 11, marginBottom: 8, fontFamily: "var(--font-display)", letterSpacing: "0.5px" }}>✗ LIMITATIONS</h4>
            {(algo.cons || []).map((c, i) => <div key={i} style={{ color: "#CBD5E1", fontSize: 12, padding: "3px 0 3px 12px", position: "relative", lineHeight: 1.5 }}><span style={{ position: "absolute", left: 0, color: "#F87171" }}>›</span>{c}</div>)}
          </div>
        </div>
        {algo.score !== undefined && (
          <div style={{ marginTop: 20, padding: "10px 14px", borderRadius: 8, background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.15)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "#FBBF24", fontSize: 12, fontWeight: 700, fontFamily: "var(--font-display)" }}>Match Score</span>
              <span style={{ color: "#FBBF24", fontSize: 16, fontWeight: 700, fontFamily: "var(--font-display)" }}>{algo.score}%</span>
            </div>
            <div style={{ background: "#1E293B", borderRadius: 3, height: 4, marginTop: 8, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${algo.score}%`, background: "linear-gradient(90deg,#FBBF24,#F59E0B)", borderRadius: 3, transition: "width 0.5s" }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function UseCaseCard({ useCase, industry, index }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      onClick={() => setOpen(!open)}
      style={{
        padding: "16px 18px", borderRadius: 10, cursor: "pointer", transition: "all 0.2s",
        background: open ? industry.gradient : "rgba(255,255,255,0.02)",
        border: `1px solid ${open ? industry.color + "40" : "rgba(255,255,255,0.04)"}`,
        animation: `fadeSlide 0.3s ease ${index * 0.05}s both`,
      }}
      onMouseEnter={(e) => { if (!open) e.currentTarget.style.borderColor = industry.color + "25"; }}
      onMouseLeave={(e) => { if (!open) e.currentTarget.style.borderColor = open ? industry.color + "40" : "rgba(255,255,255,0.04)"; }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 24, height: 24, borderRadius: 6, background: industry.color + "15", color: industry.color, fontSize: 11, fontWeight: 700, fontFamily: "var(--font-display)" }}>{index + 1}</span>
          <h4 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: "#F1F5F9", fontFamily: "var(--font-display)" }}>{useCase.title}</h4>
        </div>
        <span style={{ fontSize: 10, color: industry.color, transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s", opacity: 0.7 }}>▼</span>
      </div>
      <p style={{ margin: "6px 0 0 32px", fontSize: 12, color: "#94A3B8", lineHeight: 1.5 }}>{useCase.desc}</p>

      {open && (
        <div style={{ marginTop: 14, marginLeft: 32, animation: "fadeSlide 0.2s ease" }}>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 10, color: industry.color, fontWeight: 600, marginBottom: 6, fontFamily: "var(--font-display)", letterSpacing: "0.5px" }}>RECOMMENDED ALGORITHMS</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {useCase.algorithms.map((a, i) => (
                <span key={i} style={{ padding: "3px 9px", borderRadius: 99, background: industry.color + "12", color: industry.color, fontSize: 11, fontWeight: 500 }}>{a}</span>
              ))}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div style={{ padding: "10px 14px", borderRadius: 8, background: "rgba(0,0,0,0.25)", border: "1px solid rgba(255,255,255,0.03)" }}>
              <div style={{ fontSize: 9, color: "#64748B", fontFamily: "var(--font-display)", letterSpacing: "0.5px", marginBottom: 3 }}>BUSINESS IMPACT</div>
              <div style={{ fontSize: 12, color: "#34D399", fontWeight: 600 }}>{useCase.impact}</div>
            </div>
            <div style={{ padding: "10px 14px", borderRadius: 8, background: "rgba(0,0,0,0.25)", border: "1px solid rgba(255,255,255,0.03)" }}>
              <div style={{ fontSize: 9, color: "#64748B", fontFamily: "var(--font-display)", letterSpacing: "0.5px", marginBottom: 3 }}>DATA TYPE</div>
              <div style={{ fontSize: 12, color: "#CBD5E1", fontWeight: 600 }}>{useCase.dataType}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════ */
export default function MLAlgorithmNavigator() {
  const [view, setView] = useState("tree");
  const [expanded, setExpanded] = useState({ root: true });
  const [selectedAlgo, setSelectedAlgo] = useState(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeIndustry, setActiveIndustry] = useState(INDUSTRIES[0].id);

  const toggleExpand = useCallback((id) => setExpanded((p) => ({ ...p, [id]: !p[id] })), []);
  const expandAll = () => { const ids = {}; (function walk(n) { ids[n.id] = true; n.children?.forEach(walk); })(ML_TREE); setExpanded(ids); };
  const collapseAll = () => setExpanded({ root: true });

  const handleAnswer = (qId, value) => {
    const newA = { ...answers, [qId]: value };
    setAnswers(newA);
    if (currentQ < QUESTIONS.length - 1) setTimeout(() => setCurrentQ(currentQ + 1), 150);
    else { setResults(scoreAlgorithms(newA)); setTimeout(() => setView("results"), 200); }
  };

  const resetWizard = () => { setCurrentQ(0); setAnswers({}); setResults([]); setView("wizard"); };

  function filterTree(node, q) {
    if (!q) return node;
    const lq = q.toLowerCase();
    if (node.name.toLowerCase().includes(lq) || (node.desc || "").toLowerCase().includes(lq)) return node;
    if (node.children) { const f = node.children.map((c) => filterTree(c, q)).filter(Boolean); if (f.length) return { ...node, children: f }; }
    return null;
  }
  const filteredTree = filterTree(ML_TREE, searchQuery) || { ...ML_TREE, children: [] };
  useEffect(() => { if (searchQuery) expandAll(); }, [searchQuery]);

  const tabs = [
    { id: "tree", label: "Algorithm Tree", icon: "🌳" },
    { id: "wizard", label: "Selection Wizard", icon: "🧙" },
    { id: "usecases", label: "Industry Use Cases", icon: "🏢" },
  ];

  const currentIndustry = INDUSTRIES.find((i) => i.id === activeIndustry);

  return (
    <div style={{ minHeight: "100vh", background: "#060B14", color: "#E2E8F0", fontFamily: "var(--font-body)" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Outfit:wght@400;500;600;700&display=swap');
        :root { --font-display: 'JetBrains Mono', monospace; --font-body: 'Outfit', sans-serif; }
        @keyframes fadeSlide { from { opacity:0; transform:translateY(-5px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        @keyframes scaleIn { from { opacity:0; transform:scale(0.96); } to { opacity:1; transform:scale(1); } }
        * { box-sizing: border-box; margin: 0; }
        ::-webkit-scrollbar { width:5px; } ::-webkit-scrollbar-track { background:transparent; } ::-webkit-scrollbar-thumb { background:#1E293B; border-radius:3px; }
        body { margin: 0; background: #060B14; }
      `}</style>

      {/* ── HEADER ── */}
      <header style={{ padding: "20px 24px 0", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 16 }}>
          <div>
            <h1 style={{ fontSize: 22, fontFamily: "var(--font-display)", fontWeight: 700, background: "linear-gradient(135deg, #22D3EE, #A78BFA, #F472B6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "-0.3px" }}>
              ML Algorithm Navigator
            </h1>
            <p style={{ color: "#475569", fontSize: 12, marginTop: 2, fontFamily: "var(--font-body)" }}>
              Explore algorithms, find the right model, or browse industry use cases
            </p>
          </div>
        </div>
        {/* ── TABS ── */}
        <div style={{ display: "flex", gap: 2, background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: 3, border: "1px solid rgba(255,255,255,0.05)" }}>
          {tabs.map((t) => {
            const active = view === t.id || (t.id === "wizard" && view === "results");
            return (
              <button key={t.id} onClick={() => t.id === "wizard" ? resetWizard() : setView(t.id)} style={{
                flex: 1, padding: "10px 12px", borderRadius: 8, border: "none",
                background: active ? "rgba(255,255,255,0.07)" : "transparent",
                color: active ? "#F1F5F9" : "#475569", cursor: "pointer",
                fontSize: 12, fontWeight: 600, fontFamily: "var(--font-display)",
                transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
              }}>
                <span style={{ fontSize: 14 }}>{t.icon}</span>
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: "20px 24px 60px" }}>

        {/* ══════ TREE VIEW ══════ */}
        {view === "tree" && (
          <div>
            <div style={{ display: "flex", gap: 6, marginBottom: 14, alignItems: "center" }}>
              <div style={{ flex: 1, position: "relative" }}>
                <input
                  type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search algorithms..."
                  style={{ width: "100%", padding: "9px 14px 9px 34px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.03)", color: "#E2E8F0", fontSize: 13, outline: "none", fontFamily: "var(--font-body)" }}
                />
                <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 13, opacity: 0.3 }}>🔍</span>
              </div>
              <button onClick={expandAll} style={{ padding: "9px 12px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.06)", background: "transparent", color: "#64748B", cursor: "pointer", fontSize: 11, fontFamily: "var(--font-display)", whiteSpace: "nowrap" }}>Expand</button>
              <button onClick={collapseAll} style={{ padding: "9px 12px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.06)", background: "transparent", color: "#64748B", cursor: "pointer", fontSize: 11, fontFamily: "var(--font-display)", whiteSpace: "nowrap" }}>Collapse</button>
            </div>
            <TreeNode node={filteredTree} onSelect={setSelectedAlgo} expanded={expanded} toggleExpand={toggleExpand} />
            {searchQuery && !filteredTree.children?.length && <div style={{ textAlign: "center", padding: 40, color: "#334155", fontSize: 14 }}>No algorithms match "{searchQuery}"</div>}
          </div>
        )}

        {/* ══════ WIZARD VIEW ══════ */}
        {view === "wizard" && (
          <div style={{ maxWidth: 560, margin: "20px auto 0" }}>
            <div style={{ display: "flex", gap: 4, marginBottom: 28 }}>
              {QUESTIONS.map((_, i) => <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= currentQ ? "#22D3EE" : "rgba(255,255,255,0.05)", transition: "background 0.3s" }} />)}
            </div>
            <div style={{ fontSize: 11, color: "#475569", marginBottom: 6, fontFamily: "var(--font-display)" }}>STEP {currentQ + 1} / {QUESTIONS.length}</div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#F1F5F9", marginBottom: 20, fontFamily: "var(--font-display)" }}>{QUESTIONS[currentQ].question}</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {QUESTIONS[currentQ].options.map((opt) => {
                const sel = answers[QUESTIONS[currentQ].id] === opt.value;
                return (
                  <button key={opt.value} onClick={() => handleAnswer(QUESTIONS[currentQ].id, opt.value)} style={{
                    display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", borderRadius: 8,
                    border: sel ? "1px solid #22D3EE40" : "1px solid rgba(255,255,255,0.04)",
                    background: sel ? "rgba(34,211,238,0.06)" : "rgba(255,255,255,0.02)",
                    color: "#E2E8F0", cursor: "pointer", fontSize: 13, textAlign: "left", transition: "all 0.15s", fontFamily: "var(--font-body)",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#22D3EE25"; e.currentTarget.style.background = "rgba(34,211,238,0.04)"; }}
                  onMouseLeave={(e) => { if (!sel) { e.currentTarget.style.borderColor = "rgba(255,255,255,0.04)"; e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}}
                  >
                    <span style={{ fontSize: 18 }}>{opt.icon}</span>{opt.label}
                  </button>
                );
              })}
            </div>
            {currentQ > 0 && <button onClick={() => setCurrentQ(currentQ - 1)} style={{ marginTop: 16, padding: "7px 14px", borderRadius: 6, border: "1px solid rgba(255,255,255,0.06)", background: "transparent", color: "#64748B", cursor: "pointer", fontSize: 12, fontFamily: "var(--font-display)" }}>← Back</button>}
          </div>
        )}

        {/* ══════ RESULTS VIEW ══════ */}
        {view === "results" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, marginTop: 8 }}>
              <div>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: "#F1F5F9", fontFamily: "var(--font-display)" }}>Recommended Algorithms</h2>
                <p style={{ color: "#475569", fontSize: 12, marginTop: 2 }}>Ranked by match to your criteria</p>
              </div>
              <button onClick={resetWizard} style={{ padding: "7px 14px", borderRadius: 6, border: "1px solid rgba(255,255,255,0.06)", background: "transparent", color: "#64748B", cursor: "pointer", fontSize: 12, fontFamily: "var(--font-display)" }}>↻ Redo</button>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16 }}>
              {Object.values(answers).map((v, i) => <span key={i} style={{ padding: "3px 9px", borderRadius: 99, background: "rgba(34,211,238,0.08)", color: "#22D3EE", fontSize: 10, fontFamily: "var(--font-display)" }}>{v.replace(/_/g, " ")}</span>)}
            </div>
            {results.length === 0 ? <div style={{ textAlign: "center", padding: 50, color: "#334155" }}>No matching algorithms. Try different criteria.</div> : (
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {results.map((algo, i) => (
                  <div key={algo.id} onClick={() => setSelectedAlgo(algo)} style={{
                    padding: "14px 16px", borderRadius: 10, cursor: "pointer", transition: "all 0.15s",
                    background: i === 0 ? "linear-gradient(135deg, rgba(251,191,36,0.05), rgba(34,211,238,0.05))" : "rgba(255,255,255,0.02)",
                    border: i === 0 ? "1px solid rgba(251,191,36,0.2)" : "1px solid rgba(255,255,255,0.04)",
                    animation: `fadeSlide 0.3s ease ${i * 0.05}s both`,
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateX(3px)"; e.currentTarget.style.borderColor = "rgba(34,211,238,0.2)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "translateX(0)"; e.currentTarget.style.borderColor = i === 0 ? "rgba(251,191,36,0.2)" : "rgba(255,255,255,0.04)"; }}
                  >
                    {i === 0 && <div style={{ fontSize: 9, color: "#FBBF24", fontWeight: 700, fontFamily: "var(--font-display)", marginBottom: 4, letterSpacing: "0.5px" }}>★ TOP PICK</div>}
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 22 }}>{algo.icon}</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: "#F1F5F9", fontFamily: "var(--font-display)" }}>{algo.name}</div>
                        <div style={{ fontSize: 11, color: "#64748B", marginTop: 1 }}>{algo.desc}</div>
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <div style={{ fontSize: 18, fontWeight: 700, color: algo.score >= 75 ? "#34D399" : algo.score >= 50 ? "#FBBF24" : "#64748B", fontFamily: "var(--font-display)" }}>{algo.score}%</div>
                        <div style={{ fontSize: 9, color: "#334155" }}>match</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ══════ USE CASES VIEW ══════ */}
        {view === "usecases" && (
          <div style={{ marginTop: 8 }}>
            {/* Industry Tabs */}
            <div style={{ display: "flex", gap: 4, overflowX: "auto", paddingBottom: 8, marginBottom: 16 }}>
              {INDUSTRIES.map((ind) => {
                const active = activeIndustry === ind.id;
                return (
                  <button key={ind.id} onClick={() => setActiveIndustry(ind.id)} style={{
                    padding: "8px 14px", borderRadius: 8, border: `1px solid ${active ? ind.color + "40" : "rgba(255,255,255,0.04)"}`,
                    background: active ? ind.gradient : "transparent",
                    color: active ? ind.color : "#475569", cursor: "pointer",
                    fontSize: 11, fontWeight: 600, fontFamily: "var(--font-display)",
                    transition: "all 0.2s", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 5, flexShrink: 0,
                  }}>
                    <span style={{ fontSize: 14 }}>{ind.icon}</span>{ind.name}
                  </button>
                );
              })}
            </div>

            {/* Industry Header & Use Cases */}
            {currentIndustry && (
              <div key={currentIndustry.id} style={{ animation: "fadeSlide 0.25s ease" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                  <span style={{ fontSize: 28 }}>{currentIndustry.icon}</span>
                  <div>
                    <h2 style={{ fontSize: 18, fontWeight: 700, color: "#F1F5F9", fontFamily: "var(--font-display)", margin: 0 }}>{currentIndustry.name}</h2>
                    <p style={{ color: "#475569", fontSize: 12, margin: "2px 0 0" }}>Top 5 ML use cases — click to explore algorithms & impact</p>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {currentIndustry.useCases.map((uc, i) => (
                    <UseCaseCard key={uc.title} useCase={uc} industry={currentIndustry} index={i} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <DetailModal algo={selectedAlgo} onClose={() => setSelectedAlgo(null)} />
    </div>
  );
}