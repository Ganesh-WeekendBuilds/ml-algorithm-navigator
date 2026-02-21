import { useState, useEffect, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════════
   PAPERS: Seminal references for each algorithm
   ═══════════════════════════════════════════════════════════════ */
const PAPERS = {
  logistic_regression: [
    { title: "Applied Logistic Regression", authors: "Hosmer & Lemeshow", year: 1989, venue: "Wiley", url: "https://doi.org/10.1002/0471722146" }
  ],
  decision_tree_c: [
    { title: "Classification and Regression Trees", authors: "Breiman et al.", year: 1984, venue: "CRC Press", url: "https://doi.org/10.1201/9781315139470" },
    { title: "C4.5: Programs for Machine Learning", authors: "Quinlan, J.R.", year: 1993, venue: "Morgan Kaufmann", url: "https://link.springer.com/article/10.1007/BF00993309" }
  ],
  random_forest_c: [
    { title: "Random Forests", authors: "Breiman, L.", year: 2001, venue: "Machine Learning, 45(1)", url: "https://doi.org/10.1023/A:1010933404324" }
  ],
  svm: [
    { title: "A Training Algorithm for Optimal Margin Classifiers", authors: "Boser, Guyon & Vapnik", year: 1992, venue: "COLT", url: "https://doi.org/10.1145/130385.130401" },
    { title: "Support-Vector Networks", authors: "Cortes & Vapnik", year: 1995, venue: "Machine Learning, 20(3)", url: "https://doi.org/10.1007/BF00994018" }
  ],
  knn_c: [
    { title: "Nearest Neighbor Pattern Classification", authors: "Cover & Hart", year: 1967, venue: "IEEE Trans. Info Theory", url: "https://doi.org/10.1109/TIT.1967.1053964" }
  ],
  naive_bayes: [
    { title: "Naive Bayes at Forty: The Independence Assumption in Information Retrieval", authors: "Lewis, D.D.", year: 1998, venue: "ECML", url: "https://doi.org/10.1007/BFb0026666" }
  ],
  xgboost_c: [
    { title: "XGBoost: A Scalable Tree Boosting System", authors: "Chen & Guestrin", year: 2016, venue: "KDD", url: "https://doi.org/10.1145/2939672.2939785" },
    { title: "LightGBM: A Highly Efficient Gradient Boosting Decision Tree", authors: "Ke et al.", year: 2017, venue: "NeurIPS", url: "https://papers.nips.cc/paper/6907" }
  ],
  nn_c: [
    { title: "Multilayer Feedforward Networks are Universal Approximators", authors: "Hornik et al.", year: 1989, venue: "Neural Networks, 2(5)", url: "https://doi.org/10.1016/0893-6080(89)90020-8" }
  ],
  linear_regression: [
    { title: "Regression Shrinkage and Selection via the Lasso", authors: "Tibshirani, R.", year: 1996, venue: "JRSS-B, 58(1)", url: "https://doi.org/10.1111/j.2517-6161.1996.tb02080.x" }
  ],
  ridge_lasso: [
    { title: "Ridge Regression: Biased Estimation for Nonorthogonal Problems", authors: "Hoerl & Kennard", year: 1970, venue: "Technometrics, 12(1)", url: "https://doi.org/10.1080/00401706.1970.10488634" },
    { title: "Regularization and Variable Selection via the Elastic Net", authors: "Zou & Hastie", year: 2005, venue: "JRSS-B, 67(2)", url: "https://doi.org/10.1111/j.1467-9868.2005.00503.x" }
  ],
  decision_tree_r: [
    { title: "Classification and Regression Trees", authors: "Breiman et al.", year: 1984, venue: "CRC Press", url: "https://doi.org/10.1201/9781315139470" }
  ],
  random_forest_r: [
    { title: "Random Forests", authors: "Breiman, L.", year: 2001, venue: "Machine Learning, 45(1)", url: "https://doi.org/10.1023/A:1010933404324" }
  ],
  xgboost_r: [
    { title: "XGBoost: A Scalable Tree Boosting System", authors: "Chen & Guestrin", year: 2016, venue: "KDD", url: "https://doi.org/10.1145/2939672.2939785" }
  ],
  svr: [
    { title: "A Tutorial on Support Vector Regression", authors: "Smola & Schölkopf", year: 2004, venue: "Statistics & Computing, 14(3)", url: "https://doi.org/10.1023/B:STCO.0000035301.49549.88" }
  ],
  nn_r: [
    { title: "Multilayer Feedforward Networks are Universal Approximators", authors: "Hornik et al.", year: 1989, venue: "Neural Networks, 2(5)", url: "https://doi.org/10.1016/0893-6080(89)90020-8" }
  ],
  kmeans: [
    { title: "Least Squares Quantization in PCM", authors: "Lloyd, S.", year: 1982, venue: "IEEE Trans. Info Theory", url: "https://doi.org/10.1109/TIT.1982.1056489" }
  ],
  dbscan: [
    { title: "A Density-Based Algorithm for Discovering Clusters", authors: "Ester et al.", year: 1996, venue: "KDD", url: "https://dl.acm.org/doi/10.5555/3001460.3001507" }
  ],
  hierarchical: [
    { title: "Hierarchical Grouping to Optimize an Objective Function", authors: "Ward, J.H.", year: 1963, venue: "JASA, 58(301)", url: "https://doi.org/10.1080/01621459.1963.10500845" }
  ],
  gmm: [
    { title: "Maximum Likelihood from Incomplete Data via the EM Algorithm", authors: "Dempster, Laird & Rubin", year: 1977, venue: "JRSS-B, 39(1)", url: "https://doi.org/10.1111/j.2517-6161.1977.tb01600.x" }
  ],
  pca: [
    { title: "On Lines and Planes of Closest Fit to Systems of Points in Space", authors: "Pearson, K.", year: 1901, venue: "Phil. Mag., 2(11)", url: "https://doi.org/10.1080/14786440109462720" }
  ],
  tsne: [
    { title: "Visualizing Data using t-SNE", authors: "van der Maaten & Hinton", year: 2008, venue: "JMLR, 9", url: "https://jmlr.org/papers/v9/vandermaaten08a.html" }
  ],
  umap: [
    { title: "UMAP: Uniform Manifold Approximation and Projection for Dimension Reduction", authors: "McInnes, Healy & Melville", year: 2018, venue: "arXiv:1802.03426", url: "https://arxiv.org/abs/1802.03426" }
  ],
  autoencoder: [
    { title: "Reducing the Dimensionality of Data with Neural Networks", authors: "Hinton & Salakhutdinov", year: 2006, venue: "Science, 313(5786)", url: "https://doi.org/10.1126/science.1127647" }
  ],
  isolation_forest: [
    { title: "Isolation Forest", authors: "Liu, Ting & Zhou", year: 2008, venue: "ICDM", url: "https://doi.org/10.1109/ICDM.2008.17" }
  ],
  one_class_svm: [
    { title: "Estimating the Support of a High-Dimensional Distribution", authors: "Schölkopf et al.", year: 2001, venue: "Neural Computation, 13(7)", url: "https://doi.org/10.1162/089976601750264965" }
  ],
  lof: [
    { title: "LOF: Identifying Density-Based Local Outliers", authors: "Breunig et al.", year: 2000, venue: "SIGMOD", url: "https://doi.org/10.1145/342009.335388" }
  ],
  cnn: [
    { title: "ImageNet Classification with Deep Convolutional Neural Networks", authors: "Krizhevsky, Sutskever & Hinton", year: 2012, venue: "NeurIPS", url: "https://papers.nips.cc/paper/4824" },
    { title: "Gradient-Based Learning Applied to Document Recognition", authors: "LeCun et al.", year: 1998, venue: "Proc. IEEE", url: "https://doi.org/10.1109/5.726791" }
  ],
  resnet: [
    { title: "Deep Residual Learning for Image Recognition", authors: "He et al.", year: 2016, venue: "CVPR", url: "https://doi.org/10.1109/CVPR.2016.90" },
    { title: "EfficientNet: Rethinking Model Scaling for CNNs", authors: "Tan & Le", year: 2019, venue: "ICML", url: "https://arxiv.org/abs/1905.11946" }
  ],
  yolo: [
    { title: "You Only Look Once: Unified, Real-Time Object Detection", authors: "Redmon et al.", year: 2016, venue: "CVPR", url: "https://doi.org/10.1109/CVPR.2016.91" }
  ],
  unet: [
    { title: "U-Net: Convolutional Networks for Biomedical Image Segmentation", authors: "Ronneberger, Fischer & Brox", year: 2015, venue: "MICCAI", url: "https://doi.org/10.1007/978-3-319-24574-4_28" }
  ],
  rnn_lstm: [
    { title: "Long Short-Term Memory", authors: "Hochreiter & Schmidhuber", year: 1997, venue: "Neural Computation, 9(8)", url: "https://doi.org/10.1162/neco.1997.9.8.1735" }
  ],
  transformer: [
    { title: "Attention Is All You Need", authors: "Vaswani et al.", year: 2017, venue: "NeurIPS", url: "https://arxiv.org/abs/1706.03762" },
    { title: "BERT: Pre-training of Deep Bidirectional Transformers", authors: "Devlin et al.", year: 2019, venue: "NAACL", url: "https://arxiv.org/abs/1810.04805" }
  ],
  word2vec: [
    { title: "Efficient Estimation of Word Representations in Vector Space", authors: "Mikolov et al.", year: 2013, venue: "arXiv:1301.3781", url: "https://arxiv.org/abs/1301.3781" },
    { title: "GloVe: Global Vectors for Word Representation", authors: "Pennington, Socher & Manning", year: 2014, venue: "EMNLP", url: "https://doi.org/10.3115/v1/D14-1162" }
  ],
  gan: [
    { title: "Generative Adversarial Nets", authors: "Goodfellow et al.", year: 2014, venue: "NeurIPS", url: "https://arxiv.org/abs/1406.2661" }
  ],
  vae: [
    { title: "Auto-Encoding Variational Bayes", authors: "Kingma & Welling", year: 2014, venue: "ICLR", url: "https://arxiv.org/abs/1312.6114" }
  ],
  diffusion: [
    { title: "Denoising Diffusion Probabilistic Models", authors: "Ho, Jain & Abbeel", year: 2020, venue: "NeurIPS", url: "https://arxiv.org/abs/2006.11239" },
    { title: "High-Resolution Image Synthesis with Latent Diffusion Models", authors: "Rombach et al.", year: 2022, venue: "CVPR", url: "https://arxiv.org/abs/2112.10752" }
  ],
  q_learning: [
    { title: "Playing Atari with Deep Reinforcement Learning", authors: "Mnih et al.", year: 2013, venue: "arXiv:1312.5602", url: "https://arxiv.org/abs/1312.5602" },
    { title: "Human-level Control Through Deep Reinforcement Learning", authors: "Mnih et al.", year: 2015, venue: "Nature, 518", url: "https://doi.org/10.1038/nature14236" }
  ],
  policy_gradient: [
    { title: "Proximal Policy Optimization Algorithms", authors: "Schulman et al.", year: 2017, venue: "arXiv:1707.06347", url: "https://arxiv.org/abs/1707.06347" },
    { title: "Asynchronous Methods for Deep Reinforcement Learning", authors: "Mnih et al.", year: 2016, venue: "ICML", url: "https://arxiv.org/abs/1602.01783" }
  ],
  multi_agent: [
    { title: "Multi-Agent Actor-Critic for Mixed Cooperative-Competitive Environments", authors: "Lowe et al.", year: 2017, venue: "NeurIPS", url: "https://arxiv.org/abs/1706.02275" }
  ],
};

/* ═══════════════════════════════════════════════════════════════
   TRENDING: What's hot in ML right now
   ═══════════════════════════════════════════════════════════════ */
const TRENDING_DATA = [
  {
    id: "mamba_ssm",
    category: "Architecture",
    icon: "🐍",
    title: "Mamba & SSMs: The Transformer Alternatives",
    desc: "State Space Models (SSMs) like Mamba are challenging Transformers by offering linear-time complexity and handling million-token contexts without the quadratic memory bottleneck of self-attention.",
    tags: ["RNN / LSTM / GRU", "Transformer / BERT / GPT"],
    heat: 5,
    source: "Mamba: Linear-Time Sequence Modeling (arXiv)",
    url: "https://arxiv.org/abs/2312.00752",
    trend: "up",
  },
  {
    id: "dpo_alignment",
    category: "Alignment / Fine-Tuning",
    icon: "🎯",
    title: "DPO Replacing RLHF for Model Alignment",
    desc: "Direct Preference Optimization (DPO) has largely replaced complex RLHF pipelines. It mathematically maps the reward model directly to the policy, making fine-tuning open-source LLMs highly accessible.",
    tags: ["Policy Gradient / PPO / A3C", "Transformer / BERT / GPT"],
    heat: 5,
    source: "DPO Original Paper (arXiv)",
    url: "https://arxiv.org/abs/2305.18290",
    trend: "up",
  },
  {
    id: "agentic_workflows",
    category: "Agents",
    icon: "🤖",
    title: "Agentic Workflows & Tool Use (ReAct)",
    desc: "Moving beyond single prompts, AI is transitioning to agentic workflows where models reason, plan, and execute actions using external tools (web browsing, code execution) to solve multi-step problems.",
    tags: ["Transformer / BERT / GPT", "Q-Learning / DQN"],
    heat: 5,
    source: "ReAct: Synergizing Reasoning and Acting (arXiv)",
    url: "https://arxiv.org/abs/2210.03629",
    trend: "up",
  },
  {
    id: "multi_agent_systems",
    category: "Agents",
    icon: "🤝",
    title: "Multi-Agent Collaboration Networks",
    desc: "Frameworks like AutoGen and CrewAI allow multiple specialized AI agents to converse, debate, debug each other, and collaboratively solve complex programming and operational tasks.",
    tags: ["Multi-Agent RL", "Transformer / BERT / GPT"],
    heat: 5,
    source: "AutoGen: Enabling Next-Gen LLM Apps (arXiv)",
    url: "https://arxiv.org/abs/2308.08155",
    trend: "up",
  },
  {
    id: "gui_agents",
    category: "Agents",
    icon: "💻",
    title: "Computer-Use and GUI Agents",
    desc: "AI is moving from the chat window to the desktop. Models are now being trained to visually perceive screen states and autonomously operate standard computer GUIs (mouse/keyboard) to execute tasks.",
    tags: ["Q-Learning / DQN", "CNN (ConvNet)", "Transformer / BERT / GPT"],
    heat: 5,
    source: "OSWorld: Benchmarking Computer Agents (arXiv)",
    url: "https://arxiv.org/abs/2403.08232",
    trend: "up",
  },
  {
    id: "diffusion_transformers",
    category: "Generative AI",
    icon: "🌊",
    title: "Diffusion Transformers (DiT) Powering Video",
    desc: "Replacing standard U-Nets with Transformers in diffusion models (DiT) has unlocked massive scaling capabilities, directly powering hyper-realistic video generation models like OpenAI's Sora.",
    tags: ["Diffusion Models", "Transformer / BERT / GPT"],
    heat: 5,
    source: "Scalable Diffusion Models with Transformers (arXiv)",
    url: "https://arxiv.org/abs/2212.09748",
    trend: "up",
  },
  {
    id: "flow_matching",
    category: "Generative AI",
    icon: "🌪️",
    title: "Flow Matching & Rectified Flows",
    desc: "Flow matching is emerging as a faster, more mathematically elegant successor to standard diffusion models, directly powering the latest generation of image models like Stable Diffusion 3 and Flux.",
    tags: ["Diffusion Models", "Generative AI"],
    heat: 5,
    source: "Scaling Rectified Flow Transformers (arXiv)",
    url: "https://arxiv.org/abs/2403.03206",
    trend: "up",
  },
  {
    id: "mixed_modal_gen",
    category: "Generative AI",
    icon: "🎨",
    title: "Early-Fusion Any-to-Any Generation",
    desc: "Moving beyond separate text and image encoders glued together, models like Chameleon use a single unified architecture to natively interleave text and image generation, eliminating cross-modal bottlenecks.",
    tags: ["Transformer / BERT / GPT", "GAN"],
    heat: 4,
    source: "Chameleon: Mixed-Modal Foundation Models (arXiv)",
    url: "https://arxiv.org/abs/2405.09818",
    trend: "up",
  },
  {
    id: "lora_peft",
    category: "Efficiency",
    icon: "🔧",
    title: "PEFT & LoRA Democratizing Model Training",
    desc: "Low-Rank Adaptation (LoRA) and QLoRA allow massive 70B+ parameter models to be fine-tuned on single consumer GPUs by freezing original weights and training small rank-decomposition matrices.",
    tags: ["Transformer / BERT / GPT", "Neural Network (MLP)"],
    heat: 4,
    source: "LoRA: Low-Rank Adaptation of LLMs (arXiv)",
    url: "https://arxiv.org/abs/2106.09685",
    trend: "up",
  },
  {
    id: "small_models",
    category: "Efficiency",
    icon: "📱",
    title: "Small Language Models (SLMs) on Edge",
    desc: "Models trained on heavily curated, textbook-quality synthetic data (like Phi-3) are proving that sub-5B parameter models can compete with historically massive models, running locally on phones.",
    tags: ["Transformer / BERT / GPT"],
    heat: 4,
    source: "Phi-3 Technical Report (arXiv)",
    url: "https://arxiv.org/abs/2404.14219",
    trend: "up",
  },
  {
    id: "xgboost_dominance",
    category: "Tabular ML",
    icon: "🏆",
    title: "Tree Ensembles Still Dominate Tabular Data",
    desc: "Despite massive advances in deep learning, extensive empirical benchmarking confirms that tree-based models (XGBoost, Random Forest) still consistently outperform neural networks on typical tabular datasets.",
    tags: ["XGBoost / LightGBM", "Random Forest", "Decision Tree"],
    heat: 4,
    source: "Why do tree models outperform DL? (arXiv)",
    url: "https://arxiv.org/abs/2207.08815",
    trend: "up",
  },
  {
    id: "rag",
    category: "NLP / LLMs",
    icon: "📚",
    title: "Retrieval-Augmented Generation (RAG)",
    desc: "Instead of continuously retraining models, connecting LLMs to vector databases via RAG has become the industry standard for reducing hallucination and securely querying proprietary enterprise data.",
    tags: ["Transformer / BERT / GPT", "Word2Vec / GloVe"],
    heat: 4,
    source: "Original RAG Paper (arXiv)",
    url: "https://arxiv.org/abs/2005.11401",
    trend: "up",
  },
  {
    id: "alphafold_3",
    category: "Healthcare / Bio",
    icon: "🧬",
    title: "AI Solving Grand Scientific Challenges",
    desc: "Models like AlphaFold 3 are generalizing beyond protein folding to predict the structures of all of life's molecules (DNA, RNA, ligands), representing a massive shift of ML into foundational biology.",
    tags: ["Neural Network (MLP)", "Transformer / BERT / GPT"],
    heat: 4,
    source: "AlphaFold 3 Paper (Nature)",
    url: "https://www.nature.com/articles/s41586-024-07487-w",
    trend: "up",
  },
  {
    id: "kan_networks",
    category: "Architecture",
    icon: "🕸️",
    title: "Kolmogorov-Arnold Networks (KANs)",
    desc: "KANs replace standard linear weights with learnable activation functions on edges. They show massive promise in being highly interpretable and requiring fewer parameters than traditional MLPs for scientific tasks.",
    tags: ["Neural Network (MLP)", "Linear Regression"],
    heat: 3,
    source: "KAN: Kolmogorov-Arnold Networks (arXiv)",
    url: "https://arxiv.org/abs/2404.19756",
    trend: "up",
  }
];

const HEAT_LABELS = { 5: "🔥 Very Hot", 4: "📈 Rising Fast", 3: "🌱 Growing", 2: "➡️ Stable", 1: "📉 Declining" };
const HEAT_COLORS = { 5: "#EF4444", 4: "#F59E0B", 3: "#34D399", 2: "#94A3B8", 1: "#475569" };

/* ═══════════════════════════════════════════════════════════════
   ML TREE DATA
   ═══════════════════════════════════════════════════════════════ */
const ML_TREE={id:"root",name:"Machine Learning",icon:"🧠",children:[{id:"supervised",name:"Supervised Learning",icon:"🎯",desc:"Learn from labeled data",children:[{id:"classification",name:"Classification",icon:"🏷️",desc:"Predict discrete categories",children:[
{id:"logistic_regression",name:"Logistic Regression",icon:"📈",desc:"Linear model for binary/multi-class classification",tags:["classification","tabular","small","medium","interpretable","binary","multiclass"],pros:["Fast training","Highly interpretable","Good baseline"],cons:["Assumes linearity","Poor with complex boundaries"],complexity:"Low",compute:{cost:"$",hardware:"CPU"},ratings:{speed:5,accuracy:2,interpretability:5,scalability:4,data_req:1},code:{sklearn:`from sklearn.linear_model import LogisticRegression\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.metrics import accuracy_score\n\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)\n\nmodel = LogisticRegression(max_iter=1000)\nmodel.fit(X_train, y_train)\ny_pred = model.predict(X_test)\nprint(f"Accuracy: {accuracy_score(y_test, y_pred):.3f}")`}},
{id:"decision_tree_c",name:"Decision Tree",icon:"🌳",desc:"Tree-based splitting rules for classification",tags:["classification","tabular","small","medium","interpretable","binary","multiclass"],pros:["Very interpretable","Handles non-linear data","No scaling needed"],cons:["Prone to overfitting","Unstable"],complexity:"Low",compute:{cost:"$",hardware:"CPU"},ratings:{speed:4,accuracy:2,interpretability:5,scalability:3,data_req:1},code:{sklearn:`from sklearn.tree import DecisionTreeClassifier, export_text\n\nmodel = DecisionTreeClassifier(max_depth=5, min_samples_split=10)\nmodel.fit(X_train, y_train)\nprint(export_text(model, feature_names=feature_names))`}},
{id:"random_forest_c",name:"Random Forest",icon:"🌲",desc:"Ensemble of decision trees for robust classification",tags:["classification","tabular","medium","large","binary","multiclass","robust"],pros:["Robust","Handles missing data","Feature importance"],cons:["Less interpretable","Slower than single tree"],complexity:"Medium",compute:{cost:"$$",hardware:"CPU / Edge GPU"},ratings:{speed:3,accuracy:4,interpretability:3,scalability:4,data_req:2},code:{sklearn:`from sklearn.ensemble import RandomForestClassifier\n\nmodel = RandomForestClassifier(n_estimators=200, max_depth=10, n_jobs=-1)\nmodel.fit(X_train, y_train)\nprint(f"Accuracy: {model.score(X_test, y_test):.3f}")`}},
{id:"svm",name:"Support Vector Machine",icon:"⚔️",desc:"Finds optimal hyperplane separating classes",tags:["classification","tabular","small","medium","binary","high_dimensional"],pros:["Effective in high dimensions","Memory efficient"],cons:["Slow on large datasets","Sensitive to scaling"],complexity:"Medium",compute:{cost:"$$",hardware:"CPU"},ratings:{speed:2,accuracy:4,interpretability:2,scalability:2,data_req:2},code:{sklearn:`from sklearn.svm import SVC\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.pipeline import make_pipeline\n\nmodel = make_pipeline(StandardScaler(), SVC(kernel='rbf', C=1.0))\nmodel.fit(X_train, y_train)`}},
{id:"knn_c",name:"K-Nearest Neighbors",icon:"👥",desc:"Classify based on closest training examples",tags:["classification","tabular","small","binary","multiclass","interpretable"],pros:["Simple","No training phase","Non-parametric"],cons:["Slow prediction","Curse of dimensionality"],complexity:"Low",compute:{cost:"$",hardware:"CPU"},ratings:{speed:2,accuracy:3,interpretability:4,scalability:1,data_req:2},code:{sklearn:`from sklearn.neighbors import KNeighborsClassifier\nfrom sklearn.pipeline import make_pipeline\n\nmodel = make_pipeline(StandardScaler(), KNeighborsClassifier(n_neighbors=5))\nmodel.fit(X_train, y_train)`}},
{id:"naive_bayes",name:"Naive Bayes",icon:"📊",desc:"Probabilistic classifier using Bayes theorem",tags:["classification","text","small","medium","binary","multiclass","interpretable","fast"],pros:["Very fast","Works well with text","Good with small data"],cons:["Assumes feature independence","Can be outperformed"],complexity:"Low",compute:{cost:"$",hardware:"CPU"},ratings:{speed:5,accuracy:2,interpretability:4,scalability:5,data_req:1},code:{sklearn:`from sklearn.naive_bayes import MultinomialNB\nfrom sklearn.feature_extraction.text import TfidfVectorizer\n\nvec = TfidfVectorizer(max_features=5000)\nX_tfidf = vec.fit_transform(X_text)\nmodel = MultinomialNB(alpha=1.0)\nmodel.fit(X_tfidf, y)`}},
{id:"xgboost_c",name:"XGBoost / LightGBM",icon:"🚀",desc:"Gradient boosted trees — competition winner",tags:["classification","tabular","medium","large","binary","multiclass","robust","high_performance"],pros:["State-of-art for tabular","Handles missing values","Fast"],cons:["Requires tuning","Less interpretable"],complexity:"Medium",compute:{cost:"$$$",hardware:"CPU / 1x GPU"},ratings:{speed:3,accuracy:5,interpretability:2,scalability:5,data_req:2},code:{sklearn:`import xgboost as xgb\n\nmodel = xgb.XGBClassifier(n_estimators=300, max_depth=6, learning_rate=0.1)\nmodel.fit(X_train, y_train, eval_set=[(X_test, y_test)], verbose=False)\nprint(f"Accuracy: {model.score(X_test, y_test):.3f}")`,pytorch:`import lightgbm as lgb\n\ntrain_data = lgb.Dataset(X_train, label=y_train)\nparams = {'objective':'binary','metric':'binary_logloss','learning_rate':0.05,'num_leaves':31}\nmodel = lgb.train(params, train_data, num_boost_round=500)`}},
{id:"nn_c",name:"Neural Network (MLP)",icon:"🔮",desc:"Multi-layer perceptron for complex classification",tags:["classification","tabular","image","text","large","binary","multiclass","complex"],pros:["Handles complex patterns","Flexible architecture"],cons:["Needs lots of data","Hard to interpret"],complexity:"High",compute:{cost:"$$$",hardware:"1x GPU"},ratings:{speed:2,accuracy:4,interpretability:1,scalability:4,data_req:4},code:{sklearn:`from sklearn.neural_network import MLPClassifier\n\nmodel = MLPClassifier(hidden_layer_sizes=(128,64,32), max_iter=500, early_stopping=True)\nmodel.fit(X_train, y_train)`,pytorch:`import torch.nn as nn\n\nclass MLP(nn.Module):\n    def __init__(self, d, c):\n        super().__init__()\n        self.net = nn.Sequential(nn.Linear(d,128),nn.ReLU(),nn.Dropout(0.3),nn.Linear(128,64),nn.ReLU(),nn.Linear(64,c))\n    def forward(self, x): return self.net(x)`}}
]},{id:"regression",name:"Regression",icon:"📉",desc:"Predict continuous values",children:[
{id:"linear_regression",name:"Linear Regression",icon:"📐",desc:"Fit a line/plane to predict continuous output",tags:["regression","tabular","small","medium","interpretable","continuous"],pros:["Fast","Interpretable","Good baseline"],cons:["Assumes linearity","Sensitive to outliers"],complexity:"Low",compute:{cost:"$",hardware:"CPU"},ratings:{speed:5,accuracy:2,interpretability:5,scalability:4,data_req:1},code:{sklearn:`from sklearn.linear_model import LinearRegression\nfrom sklearn.metrics import r2_score\n\nmodel = LinearRegression()\nmodel.fit(X_train, y_train)\nprint(f"R²: {r2_score(y_test, model.predict(X_test)):.3f}")`}},
{id:"ridge_lasso",name:"Ridge / Lasso / ElasticNet",icon:"🎛️",desc:"Regularized linear regression variants",tags:["regression","tabular","small","medium","interpretable","continuous","high_dimensional"],pros:["Prevents overfitting","Feature selection (Lasso)"],cons:["Still linear","Need to tune regularization"],complexity:"Low",compute:{cost:"$",hardware:"CPU"},ratings:{speed:5,accuracy:3,interpretability:4,scalability:4,data_req:1},code:{sklearn:`from sklearn.linear_model import Ridge, Lasso\nfrom sklearn.model_selection import GridSearchCV\n\nridge = GridSearchCV(Ridge(), {'alpha':[0.01,0.1,1,10,100]}, cv=5)\nridge.fit(X_train, y_train)`}},
{id:"decision_tree_r",name:"Decision Tree Regressor",icon:"🌳",desc:"Tree-based splitting for regression",tags:["regression","tabular","small","medium","interpretable","continuous"],pros:["Interpretable","Non-linear"],cons:["Overfitting","Piecewise predictions"],complexity:"Low",compute:{cost:"$",hardware:"CPU"},ratings:{speed:4,accuracy:2,interpretability:5,scalability:3,data_req:1},code:{sklearn:`from sklearn.tree import DecisionTreeRegressor\nmodel = DecisionTreeRegressor(max_depth=5)\nmodel.fit(X_train, y_train)`}},
{id:"random_forest_r",name:"Random Forest Regressor",icon:"🌲",desc:"Ensemble trees for regression",tags:["regression","tabular","medium","large","continuous","robust"],pros:["Robust","Feature importance"],cons:["Cannot extrapolate","Memory heavy"],complexity:"Medium",compute:{cost:"$$",hardware:"CPU / Edge GPU"},ratings:{speed:3,accuracy:4,interpretability:3,scalability:4,data_req:2},code:{sklearn:`from sklearn.ensemble import RandomForestRegressor\nmodel = RandomForestRegressor(n_estimators=200, n_jobs=-1)\nmodel.fit(X_train, y_train)`}},
{id:"xgboost_r",name:"XGBoost / LightGBM Regressor",icon:"🚀",desc:"Gradient boosted trees for regression",tags:["regression","tabular","medium","large","continuous","high_performance"],pros:["Top performer on tabular","Handles missing values"],cons:["Requires tuning","Can overfit"],complexity:"Medium",compute:{cost:"$$$",hardware:"CPU / 1x GPU"},ratings:{speed:3,accuracy:5,interpretability:2,scalability:5,data_req:2},code:{sklearn:`import xgboost as xgb\nmodel = xgb.XGBRegressor(n_estimators=300, max_depth=6, learning_rate=0.1)\nmodel.fit(X_train, y_train)`}},
{id:"svr",name:"Support Vector Regression",icon:"⚔️",desc:"SVM adapted for regression",tags:["regression","tabular","small","medium","continuous","high_dimensional"],pros:["Works in high dimensions"],cons:["Slow on large data"],complexity:"Medium",compute:{cost:"$$",hardware:"CPU"},ratings:{speed:2,accuracy:3,interpretability:2,scalability:2,data_req:2},code:{sklearn:`from sklearn.svm import SVR\nmodel = make_pipeline(StandardScaler(), SVR(kernel='rbf'))\nmodel.fit(X_train, y_train)`}},
{id:"nn_r",name:"Neural Network Regressor",icon:"🔮",desc:"Deep learning for complex regression",tags:["regression","tabular","image","large","continuous","complex"],pros:["Handles complex patterns"],cons:["Needs lots of data","Black box"],complexity:"High",compute:{cost:"$$$",hardware:"1x GPU"},ratings:{speed:2,accuracy:4,interpretability:1,scalability:4,data_req:4},code:{pytorch:`class Regressor(nn.Module):\n    def __init__(self, d):\n        super().__init__()\n        self.net = nn.Sequential(nn.Linear(d,128),nn.ReLU(),nn.Linear(128,64),nn.ReLU(),nn.Linear(64,1))\n    def forward(self, x): return self.net(x)`}}
]}]},{id:"unsupervised",name:"Unsupervised Learning",icon:"🔍",desc:"Find patterns in unlabeled data",children:[{id:"clustering",name:"Clustering",icon:"🫧",desc:"Group similar data points",children:[
{id:"kmeans",name:"K-Means",icon:"⭕",desc:"Partition data into K spherical clusters",tags:["clustering","tabular","medium","large","fast"],pros:["Fast","Scalable","Simple"],cons:["Must specify K","Assumes spherical clusters"],complexity:"Low",compute:{cost:"$",hardware:"CPU"},ratings:{speed:5,accuracy:3,interpretability:4,scalability:5,data_req:2},code:{sklearn:`from sklearn.cluster import KMeans\nfrom sklearn.metrics import silhouette_score\n\nmodel = KMeans(n_clusters=4, n_init=10)\nlabels = model.fit_predict(X)\nprint(f"Silhouette: {silhouette_score(X, labels):.3f}")`}},
{id:"dbscan",name:"DBSCAN",icon:"🌀",desc:"Density-based clustering — finds arbitrary shapes",tags:["clustering","tabular","medium","spatial","anomaly"],pros:["No K needed","Finds outliers"],cons:["Sensitive to parameters"],complexity:"Medium",compute:{cost:"$$",hardware:"CPU"},ratings:{speed:3,accuracy:4,interpretability:3,scalability:3,data_req:2},code:{sklearn:`from sklearn.cluster import DBSCAN\nmodel = DBSCAN(eps=0.5, min_samples=5)\nlabels = model.fit_predict(StandardScaler().fit_transform(X))`}},
{id:"hierarchical",name:"Hierarchical Clustering",icon:"🏔️",desc:"Builds a tree of nested clusters",tags:["clustering","tabular","small","medium","interpretable"],pros:["Dendrogram visualization"],cons:["Slow on large data"],complexity:"Medium",compute:{cost:"$$",hardware:"CPU"},ratings:{speed:2,accuracy:3,interpretability:5,scalability:1,data_req:1},code:{sklearn:`from sklearn.cluster import AgglomerativeClustering\nfrom scipy.cluster.hierarchy import dendrogram, linkage\nZ = linkage(X, method='ward')\nmodel = AgglomerativeClustering(n_clusters=4)\nlabels = model.fit_predict(X)`}},
{id:"gmm",name:"Gaussian Mixture Model",icon:"🎪",desc:"Probabilistic clustering with soft assignments",tags:["clustering","tabular","medium","probabilistic"],pros:["Soft assignments","Flexible shapes"],cons:["Sensitive to initialization"],complexity:"Medium",compute:{cost:"$$",hardware:"CPU"},ratings:{speed:3,accuracy:4,interpretability:3,scalability:3,data_req:2},code:{sklearn:`from sklearn.mixture import GaussianMixture\nmodel = GaussianMixture(n_components=4, covariance_type='full')\nmodel.fit(X)\nprobs = model.predict_proba(X)`}}
]},{id:"dim_reduction",name:"Dimensionality Reduction",icon:"🔬",desc:"Reduce feature space",children:[
{id:"pca",name:"PCA",icon:"📏",desc:"Linear projection to principal components",tags:["dimensionality_reduction","tabular","image","medium","large","fast"],pros:["Fast","Removes correlated features"],cons:["Linear only"],complexity:"Low",compute:{cost:"$",hardware:"CPU"},ratings:{speed:5,accuracy:3,interpretability:3,scalability:5,data_req:2},code:{sklearn:`from sklearn.decomposition import PCA\npca = PCA(n_components=0.95)\nX_reduced = pca.fit_transform(X)\nprint(f"Reduced: {X.shape[1]} → {X_reduced.shape[1]} dims")`}},
{id:"tsne",name:"t-SNE",icon:"🎨",desc:"Non-linear visualization in 2D/3D",tags:["dimensionality_reduction","tabular","image","medium","visualization"],pros:["Great for visualization"],cons:["Slow","Only for visualization"],complexity:"Medium",compute:{cost:"$$",hardware:"CPU / GPU"},ratings:{speed:1,accuracy:4,interpretability:2,scalability:1,data_req:2},code:{sklearn:`from sklearn.manifold import TSNE\nX_2d = TSNE(n_components=2, perplexity=30).fit_transform(X)`}},
{id:"umap",name:"UMAP",icon:"🗺️",desc:"Fast non-linear dimensionality reduction",tags:["dimensionality_reduction","tabular","image","medium","large","visualization"],pros:["Faster than t-SNE","Preserves global structure"],cons:["Hyperparameter sensitive"],complexity:"Medium",compute:{cost:"$$",hardware:"CPU / GPU"},ratings:{speed:3,accuracy:4,interpretability:2,scalability:3,data_req:2},code:{sklearn:`import umap\nreducer = umap.UMAP(n_components=2, n_neighbors=15)\nX_2d = reducer.fit_transform(X)`}},
{id:"autoencoder",name:"Autoencoder",icon:"🔄",desc:"Neural network for learned representations",tags:["dimensionality_reduction","image","text","large","complex"],pros:["Non-linear","Flexible"],cons:["Needs lots of data"],complexity:"High",compute:{cost:"$$$",hardware:"1x GPU"},ratings:{speed:2,accuracy:4,interpretability:1,scalability:4,data_req:4},code:{pytorch:`class AE(nn.Module):\n    def __init__(self, d, z=32):\n        super().__init__()\n        self.enc = nn.Sequential(nn.Linear(d,128),nn.ReLU(),nn.Linear(128,z))\n        self.dec = nn.Sequential(nn.Linear(z,128),nn.ReLU(),nn.Linear(128,d),nn.Sigmoid())\n    def forward(self,x): z=self.enc(x); return self.dec(z),z`}}
]},{id:"anomaly",name:"Anomaly Detection",icon:"⚠️",desc:"Identify unusual data points",children:[
{id:"isolation_forest",name:"Isolation Forest",icon:"🏝️",desc:"Isolate anomalies using random partitioning",tags:["anomaly","tabular","medium","large","fast"],pros:["Fast","Scalable"],cons:["Threshold selection"],complexity:"Low",compute:{cost:"$",hardware:"CPU"},ratings:{speed:5,accuracy:3,interpretability:2,scalability:5,data_req:2},code:{sklearn:`from sklearn.ensemble import IsolationForest\nmodel = IsolationForest(n_estimators=200, contamination=0.05)\nlabels = model.fit_predict(X)  # -1 = anomaly`}},
{id:"one_class_svm",name:"One-Class SVM",icon:"🛡️",desc:"SVM boundary around normal data",tags:["anomaly","tabular","small","medium","high_dimensional"],pros:["Effective in high dims"],cons:["Slow"],complexity:"Medium",compute:{cost:"$$",hardware:"CPU"},ratings:{speed:2,accuracy:3,interpretability:2,scalability:2,data_req:2},code:{sklearn:`from sklearn.svm import OneClassSVM\nmodel = OneClassSVM(kernel='rbf', nu=0.05)\nmodel.fit(X_normal)\nlabels = model.predict(X_test)`}},
{id:"lof",name:"Local Outlier Factor",icon:"📍",desc:"Density-based local anomaly detection",tags:["anomaly","tabular","small","medium"],pros:["Detects local anomalies"],cons:["Slow on large data"],complexity:"Medium",compute:{cost:"$$",hardware:"CPU"},ratings:{speed:2,accuracy:4,interpretability:3,scalability:1,data_req:2},code:{sklearn:`from sklearn.neighbors import LocalOutlierFactor\nmodel = LocalOutlierFactor(n_neighbors=20, contamination=0.05)\nlabels = model.fit_predict(X)`}}
]}]},{id:"deep_learning",name:"Deep Learning",icon:"🧬",desc:"Neural networks with many layers",children:[{id:"cv",name:"Computer Vision",icon:"👁️",desc:"Image and video understanding",children:[
{id:"cnn",name:"CNN (ConvNet)",icon:"🖼️",desc:"Convolutional networks for image tasks",tags:["classification","image","large","complex","high_performance"],pros:["State-of-art for images"],cons:["Needs GPU"],complexity:"High",compute:{cost:"$$$",hardware:"1x GPU"},ratings:{speed:2,accuracy:5,interpretability:1,scalability:4,data_req:4},code:{pytorch:`class CNN(nn.Module):\n    def __init__(self, c):\n        super().__init__()\n        self.features = nn.Sequential(\n            nn.Conv2d(3,32,3,padding=1),nn.ReLU(),nn.MaxPool2d(2),\n            nn.Conv2d(32,64,3,padding=1),nn.ReLU(),nn.MaxPool2d(2))\n        self.fc = nn.Sequential(nn.Flatten(),nn.Linear(64*56*56,256),nn.ReLU(),nn.Linear(256,c))\n    def forward(self,x): return self.fc(self.features(x))`}},
{id:"resnet",name:"ResNet / EfficientNet",icon:"🏗️",desc:"Deep residual networks",tags:["classification","image","large","complex","high_performance","pretrained"],pros:["Pretrained available"],cons:["Heavy compute"],complexity:"High",compute:{cost:"$$$$",hardware:"1x GPU"},ratings:{speed:2,accuracy:5,interpretability:1,scalability:4,data_req:3},code:{hf:`from transformers import pipeline\n\nclassifier = pipeline("image-classification", model="microsoft/resnet-50")\nres = classifier("https://huggingface.co/datasets/Narsil/image_dummy/raw/main/parrots.png")\nprint(res)`,pytorch:`import torchvision.models as models\nmodel = models.resnet50(pretrained=True)\nfor p in model.parameters(): p.requires_grad = False\nmodel.fc = nn.Linear(2048, n_classes)`}},
{id:"yolo",name:"YOLO / Object Detection",icon:"🎯",desc:"Real-time object detection",tags:["detection","image","large","complex","real_time"],pros:["Real-time speed"],cons:["Needs annotated data"],complexity:"High",compute:{cost:"$$$$",hardware:"1x-2x GPU"},ratings:{speed:4,accuracy:4,interpretability:2,scalability:4,data_req:4},code:{pytorch:`from ultralytics import YOLO\nmodel = YOLO('yolov8n.pt')\nresults = model.train(data='dataset.yaml', epochs=100, imgsz=640)`}},
{id:"unet",name:"U-Net / Segmentation",icon:"✂️",desc:"Pixel-level image segmentation",tags:["segmentation","image","large","complex","medical"],pros:["Precise boundaries"],cons:["Slow inference"],complexity:"High",compute:{cost:"$$$$",hardware:"1x-2x GPU"},ratings:{speed:2,accuracy:5,interpretability:2,scalability:3,data_req:3},code:{pytorch:`import segmentation_models_pytorch as smp\nmodel = smp.Unet(encoder_name='resnet34', encoder_weights='imagenet', classes=n_classes)`}}
]},{id:"nlp",name:"Natural Language Processing",icon:"💬",desc:"Text and language understanding",children:[
{id:"rnn_lstm",name:"RNN / LSTM / GRU",icon:"🔁",desc:"Recurrent networks for sequential text",tags:["classification","regression","text","sequence","medium","large"],pros:["Handles sequences"],cons:["Slow training"],complexity:"High",compute:{cost:"$$$",hardware:"1x GPU"},ratings:{speed:2,accuracy:3,interpretability:1,scalability:3,data_req:3},code:{pytorch:`class LSTM(nn.Module):\n    def __init__(self, V, E, H, C):\n        super().__init__()\n        self.emb = nn.Embedding(V,E)\n        self.lstm = nn.LSTM(E,H,num_layers=2,batch_first=True,bidirectional=True)\n        self.fc = nn.Linear(H*2,C)\n    def forward(self,x):\n        _,(h,_) = self.lstm(self.emb(x))\n        return self.fc(torch.cat([h[-2],h[-1]],dim=1))`}},
{id:"transformer",name:"Transformer / BERT / GPT",icon:"⚡",desc:"Attention-based — current state of the art",tags:["classification","text","large","complex","high_performance","pretrained"],pros:["State-of-art NLP","Transfer learning"],cons:["Very heavy compute"],complexity:"Very High",compute:{cost:"$$$$$",hardware:"Multi-GPU Cluster"},ratings:{speed:1,accuracy:5,interpretability:1,scalability:4,data_req:5},code:{hf:`from transformers import pipeline\n\n# Extremely easy to use pre-trained models\nclassifier = pipeline("sentiment-analysis")\nres = classifier("Hugging Face makes NLP incredibly accessible.")\nprint(res)`,pytorch:`from transformers import AutoTokenizer, AutoModelForSequenceClassification, Trainer, TrainingArguments\n\ntokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")\nmodel = AutoModelForSequenceClassification.from_pretrained("bert-base-uncased", num_labels=n_classes)\n\ntrainer = Trainer(model=model, args=TrainingArguments(output_dir='./out', num_train_epochs=3, per_device_train_batch_size=16))\ntrainer.train()`}},
{id:"word2vec",name:"Word2Vec / GloVe",icon:"📝",desc:"Word embedding representations",tags:["dimensionality_reduction","text","medium","large"],pros:["Captures semantics"],cons:["No context awareness"],complexity:"Medium",compute:{cost:"$$",hardware:"CPU / 1x GPU"},ratings:{speed:4,accuracy:3,interpretability:3,scalability:4,data_req:3},code:{sklearn:`from gensim.models import Word2Vec\nsentences = [doc.split() for doc in documents]\nmodel = Word2Vec(sentences, vector_size=100, window=5, min_count=2)\nsimilar = model.wv.most_similar('learning', topn=10)`}}
]},{id:"generative",name:"Generative Models",icon:"🎭",desc:"Generate new data samples",children:[
{id:"gan",name:"GAN",icon:"🖌️",desc:"Generative Adversarial Networks",tags:["generation","image","large","complex"],pros:["High quality outputs"],cons:["Hard to train","Mode collapse"],complexity:"Very High",compute:{cost:"$$$$",hardware:"1x-2x GPU"},ratings:{speed:1,accuracy:4,interpretability:1,scalability:3,data_req:5},code:{pytorch:`class Generator(nn.Module):\n    def __init__(self, z=100):\n        super().__init__()\n        self.net = nn.Sequential(nn.Linear(z,256),nn.LeakyReLU(0.2),nn.Linear(256,512),nn.LeakyReLU(0.2),nn.Linear(512,784),nn.Tanh())\n    def forward(self,z): return self.net(z).view(-1,1,28,28)`}},
{id:"vae",name:"VAE",icon:"🧪",desc:"Variational Autoencoder",tags:["generation","image","tabular","large","complex","probabilistic"],pros:["Smooth latent space"],cons:["Blurry outputs"],complexity:"High",compute:{cost:"$$$$",hardware:"1x GPU"},ratings:{speed:2,accuracy:3,interpretability:2,scalability:3,data_req:4},code:{pytorch:`class VAE(nn.Module):\n    def __init__(self, d, z=20):\n        super().__init__()\n        self.enc=nn.Linear(d,256); self.mu=nn.Linear(256,z); self.var=nn.Linear(256,z)\n        self.dec=nn.Sequential(nn.Linear(z,256),nn.ReLU(),nn.Linear(256,d),nn.Sigmoid())\n    def forward(self,x):\n        h=torch.relu(self.enc(x)); mu,lv=self.mu(h),self.var(h)\n        z=mu+torch.exp(0.5*lv)*torch.randn_like(lv)\n        return self.dec(z),mu,lv`}},
{id:"diffusion",name:"Diffusion Models",icon:"🌊",desc:"Iterative denoising for generation",tags:["generation","image","large","complex","high_performance"],pros:["Highest quality generation"],cons:["Very slow inference"],complexity:"Very High",compute:{cost:"$$$$$",hardware:"Multi-GPU Cluster"},ratings:{speed:1,accuracy:5,interpretability:1,scalability:3,data_req:5},code:{hf:`from diffusers import StableDiffusionPipeline\nimport torch\n\npipe = StableDiffusionPipeline.from_pretrained("runwayml/stable-diffusion-v1-5", torch_dtype=torch.float16)\npipe = pipe.to("cuda")\n\nimage = pipe("a photograph of an astronaut riding a horse on mars").images[0]\nimage.save("astronaut.png")`,pytorch:`from diffusers import DDPMPipeline, DDPMScheduler, UNet2DModel\n\nmodel = UNet2DModel(sample_size=64, in_channels=3, out_channels=3,\n    block_out_channels=(128,256,256,512))\nscheduler = DDPMScheduler(num_train_timesteps=1000)\nnoise = torch.randn_like(images)\nloss = nn.functional.mse_loss(model(noisy, timesteps).sample, noise)`}}
]}]},{id:"reinforcement",name:"Reinforcement Learning",icon:"🎮",desc:"Learn through trial and error",children:[
{id:"q_learning",name:"Q-Learning / DQN",icon:"🎲",desc:"Value-based RL for discrete actions",tags:["reinforcement","sequential","medium","discrete_actions"],pros:["Simple concept"],cons:["Discrete actions only"],complexity:"Medium",compute:{cost:"$$$",hardware:"CPU / 1x GPU"},ratings:{speed:3,accuracy:3,interpretability:3,scalability:3,data_req:3},code:{pytorch:`import gymnasium as gym\nimport numpy as np\n\nenv = gym.make('CartPole-v1')\nQ = np.zeros([500, 2])\nfor ep in range(10000):\n    s,_ = env.reset(); done=False\n    while not done:\n        a = np.argmax(Q[s]) if np.random.random()>0.1 else env.action_space.sample()\n        ns,r,done,_,_ = env.step(a)\n        Q[s,a] += 0.1*(r+0.99*np.max(Q[ns])-Q[s,a])\n        s = ns`}},
{id:"policy_gradient",name:"Policy Gradient / PPO / A3C",icon:"🧭",desc:"Policy-based RL for continuous control",tags:["reinforcement","sequential","large","continuous_actions","complex"],pros:["Continuous actions"],cons:["High variance"],complexity:"High",compute:{cost:"$$$$",hardware:"1x GPU + CPU Cluster"},ratings:{speed:1,accuracy:4,interpretability:1,scalability:3,data_req:4},code:{pytorch:`from stable_baselines3 import PPO\nimport gymnasium as gym\n\nenv = gym.make('LunarLander-v2')\nmodel = PPO('MlpPolicy', env, learning_rate=3e-4, verbose=1)\nmodel.learn(total_timesteps=500_000)`}},
{id:"multi_agent",name:"Multi-Agent RL",icon:"🤝",desc:"Multiple agents learning simultaneously",tags:["reinforcement","sequential","large","complex","multi_agent"],pros:["Emergent behavior"],cons:["Very hard to train"],complexity:"Very High",compute:{cost:"$$$$$",hardware:"Multi-GPU Cluster"},ratings:{speed:1,accuracy:3,interpretability:1,scalability:2,data_req:5},code:{pytorch:`from pettingzoo.mpe import simple_spread_v3\nenv = simple_spread_v3.parallel_env(N=3)\nobservations, _ = env.reset()\nwhile env.agents:\n    actions = {a: env.action_space(a).sample() for a in env.agents}\n    observations, rewards, terms, truncs, infos = env.step(actions)`}}
]}]};

const INDUSTRIES=[
{id:"banking",name:"Banking & Financial Services",icon:"🏦",color:"#22D3EE",gradient:"linear-gradient(135deg,#083344,#164E63)",useCases:[{title:"Fraud Detection",desc:"Real-time identification of fraudulent transactions",algorithms:["XGBoost / LightGBM","Isolation Forest","Random Forest"],impact:"Reduces losses 40-60%",dataType:"Tabular"},{title:"Credit Risk Scoring",desc:"Predict borrower default probability",algorithms:["Logistic Regression","XGBoost / LightGBM","Random Forest"],impact:"Improves accuracy 25-35%",dataType:"Tabular"},{title:"Customer Churn",desc:"Identify customers likely to leave",algorithms:["Random Forest","XGBoost / LightGBM","Logistic Regression"],impact:"Reduces churn 15-25%",dataType:"Tabular"},{title:"Algorithmic Trading",desc:"Automated strategies using market data",algorithms:["Q-Learning / DQN","Policy Gradient / PPO / A3C","RNN / LSTM / GRU"],impact:"Generates alpha",dataType:"Time-series"},{title:"Anti-Money Laundering",desc:"Detect suspicious transaction patterns",algorithms:["Isolation Forest","DBSCAN","Random Forest"],impact:"Reduces false positives 50-70%",dataType:"Tabular/Graph"}]},
{id:"retail",name:"Retail & E-Commerce",icon:"🛒",color:"#F472B6",gradient:"linear-gradient(135deg,#4C1130,#831843)",useCases:[{title:"Product Recommendation",desc:"Personalized suggestions from behavior data",algorithms:["K-Nearest Neighbors","Random Forest","Neural Network (MLP)"],impact:"Revenue +10-30%",dataType:"Tabular/Text"},{title:"Demand Forecasting",desc:"Predict future product demand",algorithms:["XGBoost / LightGBM Regressor","RNN / LSTM / GRU"],impact:"Inventory costs -20-30%",dataType:"Time-series"},{title:"Customer Segmentation",desc:"Group customers for targeted marketing",algorithms:["K-Means","DBSCAN","Gaussian Mixture Model"],impact:"Campaign ROI +25-40%",dataType:"Tabular"},{title:"Price Optimization",desc:"Dynamic pricing strategies",algorithms:["XGBoost / LightGBM Regressor","Linear Regression"],impact:"Margins +5-15%",dataType:"Tabular"},{title:"Visual Search",desc:"Image-based product search",algorithms:["CNN (ConvNet)","ResNet / EfficientNet"],impact:"Conversion +10-20%",dataType:"Image"}]},
{id:"healthcare",name:"Healthcare",icon:"🏥",color:"#34D399",gradient:"linear-gradient(135deg,#022C22,#064E3B)",useCases:[{title:"Disease Diagnosis from Imaging",desc:"Detect conditions from X-rays, MRIs, CT scans",algorithms:["CNN (ConvNet)","ResNet / EfficientNet","U-Net / Segmentation"],impact:"Radiologist-level accuracy",dataType:"Image"},{title:"Drug Discovery",desc:"Predict molecular properties, generate candidates",algorithms:["GAN","VAE","Random Forest","Transformer / BERT / GPT"],impact:"Timeline -30-50%",dataType:"Molecular"},{title:"Patient Readmission",desc:"Predict 30-day readmission likelihood",algorithms:["XGBoost / LightGBM","Random Forest","Logistic Regression"],impact:"Readmissions -15-25%",dataType:"Tabular"},{title:"Clinical NLP",desc:"Extract info from clinical notes",algorithms:["Transformer / BERT / GPT","RNN / LSTM / GRU"],impact:"Saves 3-5 hrs/day",dataType:"Text"},{title:"Genomic Risk",desc:"Predict disease susceptibility from genetics",algorithms:["Random Forest","XGBoost / LightGBM","PCA"],impact:"Precision medicine",dataType:"High-dim"}]},
{id:"manufacturing",name:"Manufacturing",icon:"🏭",color:"#FB923C",gradient:"linear-gradient(135deg,#431407,#7C2D12)",useCases:[{title:"Predictive Maintenance",desc:"Predict equipment failures from sensor data",algorithms:["XGBoost / LightGBM","RNN / LSTM / GRU","Isolation Forest"],impact:"Downtime -30-50%",dataType:"Time-series"},{title:"Quality Control",desc:"Detect defects on assembly line",algorithms:["CNN (ConvNet)","YOLO / Object Detection"],impact:"Catches 95%+ defects",dataType:"Image"},{title:"Supply Chain Optimization",desc:"Optimize logistics and inventory",algorithms:["XGBoost / LightGBM Regressor","Q-Learning / DQN"],impact:"Costs -10-20%",dataType:"Tabular"},{title:"Process Optimization",desc:"Optimize parameters for max yield",algorithms:["Random Forest Regressor","Policy Gradient / PPO / A3C"],impact:"Yield +5-15%",dataType:"Tabular"},{title:"Energy Forecasting",desc:"Predict and optimize energy usage",algorithms:["RNN / LSTM / GRU","XGBoost / LightGBM Regressor"],impact:"Energy costs -10-20%",dataType:"Time-series"}]},
{id:"insurance",name:"Insurance",icon:"🛡️",color:"#A78BFA",gradient:"linear-gradient(135deg,#1E1B4B,#312E81)",useCases:[{title:"Claims Fraud Detection",desc:"Identify fraudulent claims",algorithms:["XGBoost / LightGBM","Isolation Forest","Random Forest"],impact:"Saves 5-10% payouts",dataType:"Tabular/Text"},{title:"Risk Pricing",desc:"Price policies based on risk profiles",algorithms:["XGBoost / LightGBM Regressor","Logistic Regression"],impact:"Loss ratios +3-8%",dataType:"Tabular"},{title:"Claims Automation",desc:"Auto-classify and route claims",algorithms:["Transformer / BERT / GPT","CNN (ConvNet)"],impact:"Processing -50-70%",dataType:"Text/Image"},{title:"Customer Lifetime Value",desc:"Predict total customer value",algorithms:["XGBoost / LightGBM Regressor","Random Forest Regressor"],impact:"Retention +20-30%",dataType:"Tabular"},{title:"Catastrophe Modeling",desc:"Predict losses from natural disasters",algorithms:["Random Forest Regressor","Neural Network Regressor"],impact:"Reserve accuracy +15-25%",dataType:"Spatial"}]},
{id:"telecom",name:"Telecommunications",icon:"📡",color:"#FBBF24",gradient:"linear-gradient(135deg,#422006,#713F12)",useCases:[{title:"Network Anomaly Detection",desc:"Detect intrusions and outages",algorithms:["Isolation Forest","DBSCAN","RNN / LSTM / GRU"],impact:"Detection time -60%",dataType:"Time-series"},{title:"Customer Churn",desc:"Predict and prevent subscriber churn",algorithms:["XGBoost / LightGBM","Random Forest"],impact:"Churn -15-25%",dataType:"Tabular"},{title:"Capacity Planning",desc:"Forecast bandwidth demand",algorithms:["RNN / LSTM / GRU","XGBoost / LightGBM Regressor"],impact:"CAPEX -15-20%",dataType:"Time-series"},{title:"Call Center Optimization",desc:"Intelligent call routing",algorithms:["K-Means","XGBoost / LightGBM"],impact:"Wait time -30-40%",dataType:"Tabular"},{title:"Plan Recommendations",desc:"Suggest optimal plans",algorithms:["K-Nearest Neighbors","Random Forest"],impact:"ARPU +8-15%",dataType:"Tabular"}]}
];

const QUESTIONS=[
{id:"task",question:"What is your primary task?",options:[{label:"Predict a category",value:"classification",icon:"🏷️"},{label:"Predict a number",value:"regression",icon:"📉"},{label:"Group similar items",value:"clustering",icon:"🫧"},{label:"Detect outliers",value:"anomaly",icon:"⚠️"},{label:"Reduce features",value:"dimensionality_reduction",icon:"🔬"},{label:"Generate new data",value:"generation",icon:"🎭"},{label:"Sequential decisions",value:"reinforcement",icon:"🎮"},{label:"Detect objects",value:"detection",icon:"🎯"},{label:"Segment images",value:"segmentation",icon:"✂️"}]},
{id:"data_type",question:"What type of data?",options:[{label:"Tabular",value:"tabular",icon:"📊"},{label:"Images",value:"image",icon:"🖼️"},{label:"Text",value:"text",icon:"💬"},{label:"Time Series",value:"sequence",icon:"📈"}]},
{id:"data_size",question:"How much data?",options:[{label:"Small (< 1K)",value:"small",icon:"🔹"},{label:"Medium (1K–100K)",value:"medium",icon:"🔷"},{label:"Large (100K+)",value:"large",icon:"💎"}]},
{id:"priority",question:"What matters most?",options:[{label:"Interpretability",value:"interpretable",icon:"🔍"},{label:"Max accuracy",value:"high_performance",icon:"🏆"},{label:"Speed",value:"fast",icon:"⚡"},{label:"Robustness",value:"robust",icon:"🛡️"}]}
];

/* ═══════════════════════════════════ HELPERS ═══════════════════════════════════ */
function getAllLeaves(n){if(!n.children)return[n];return n.children.flatMap(getAllLeaves)}
function scoreAlgos(a){return getAllLeaves(ML_TREE).map(al=>{let s=0;const t=al.tags||[];Object.values(a).forEach(v=>{if(t.includes(v))s+=25});return{...al,score:s}}).filter(x=>x.score>0).sort((a,b)=>b.score-a.score)}
const BC={supervised:{accent:"#22D3EE",glow:"rgba(34,211,238,0.08)"},unsupervised:{accent:"#A78BFA",glow:"rgba(167,139,250,0.08)"},deep_learning:{accent:"#F472B6",glow:"rgba(244,114,182,0.08)"},reinforcement:{accent:"#FBBF24",glow:"rgba(251,191,36,0.08)"}};
function gc(n,p){if(BC[n.id])return BC[n.id];if(p&&BC[p.id])return BC[p.id];return{accent:"#94A3B8",glow:"rgba(148,163,184,0.08)"}}
const ML={speed:"Speed",accuracy:"Accuracy",interpretability:"Interpretability",scalability:"Scalability",data_req:"Data Required"};
const MC={speed:"#22D3EE",accuracy:"#34D399",interpretability:"#FBBF24",scalability:"#A78BFA",data_req:"#F472B6"};

/* ═══════════════════════════════════ COMPONENTS ═══════════════════════════════════ */
function RatingBar({value,max=5,color}){return<div style={{display:"flex",gap:2}}>{Array.from({length:max},(_,i)=><div key={i} style={{width:18,height:6,borderRadius:2,background:i<value?color:"rgba(255,255,255,0.06)"}}/>)}</div>}

function CodeBlock({code,label}){const[cp,setCp]=useState(false);const copy=e=>{e.stopPropagation();navigator.clipboard.writeText(code);setCp(true);setTimeout(()=>setCp(false),2000)};return<div style={{marginTop:8}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontSize:10,color:"#64748B",fontFamily:"var(--fd)",letterSpacing:"0.5px"}}>{label}</span><button onClick={copy} style={{background:cp?"rgba(52,211,153,0.15)":"rgba(255,255,255,0.05)",border:"1px solid "+(cp?"rgba(52,211,153,0.3)":"rgba(255,255,255,0.08)"),color:cp?"#34D399":"#94A3B8",fontSize:10,padding:"3px 10px",borderRadius:4,cursor:"pointer",fontFamily:"var(--fd)"}}>{cp?"✓ Copied":"Copy"}</button></div><pre style={{background:"#0A0F1A",border:"1px solid rgba(255,255,255,0.05)",borderRadius:8,padding:14,overflow:"auto",maxHeight:240,fontSize:11,lineHeight:1.6,color:"#CBD5E1",fontFamily:"var(--fd)",margin:0,whiteSpace:"pre-wrap",wordBreak:"break-word"}}>{code}</pre></div>}

function TreeNode({node:n,depth:d=0,parent:p=null,onSelect,expanded:ex,toggleExpand:te}){const c=d<=1?gc(n,p):gc(p||n,null);const hk=n.children?.length>0;const il=!hk;const o=ex[n.id];const sz={pad:d===0?"12px 16px":d===1?"10px 16px":"8px 12px",font:d===0?16:d===1?14:13,ic:d===0?22:d===1?18:15,w:d<=1?700:il?500:600};return<div style={{marginLeft:d<=1?0:16}}><div onClick={()=>il?onSelect(n):te(n.id)} style={{display:"flex",alignItems:"center",gap:10,padding:sz.pad,marginBottom:2,borderRadius:8,cursor:"pointer",background:o?c.glow:"transparent",border:`1px solid ${o?c.accent+"30":"transparent"}`,transition:"all 0.2s"}} onMouseEnter={e=>{if(!o){e.currentTarget.style.background=c.glow}}} onMouseLeave={e=>{if(!o){e.currentTarget.style.background="transparent"}}}><span style={{fontSize:sz.ic,lineHeight:1}}>{n.icon}</span><div style={{flex:1,minWidth:0}}><div style={{fontSize:sz.font,fontWeight:sz.w,color:d===0?"#F1F5F9":c.accent,fontFamily:"var(--fd)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{n.name}</div>{n.desc&&d>0&&<div style={{fontSize:11,color:"#64748B",marginTop:1}}>{n.desc}</div>}</div>{hk&&<span style={{color:c.accent,fontSize:10,transition:"transform 0.2s",transform:o?"rotate(90deg)":"rotate(0)",display:"inline-block",opacity:0.7}}>▶</span>}{il&&n.complexity&&<span style={{fontSize:9,padding:"2px 8px",borderRadius:99,background:c.accent+"18",color:c.accent,fontWeight:600,fontFamily:"var(--fd)",whiteSpace:"nowrap"}}>{n.complexity}</span>}</div>{hk&&o&&<div style={{borderLeft:`1.5px solid ${c.accent}15`,marginLeft:d===0?11:16,paddingLeft:4,animation:"fadeSlide 0.2s ease"}}>{n.children.map(ch=><TreeNode key={ch.id} node={ch} depth={d+1} parent={d<=1?n:p} onSelect={onSelect} expanded={ex} toggleExpand={te}/>)}</div>}</div>}

function DetailModal({algo:a,onClose}){const[ct,setCt]=useState("sklearn");if(!a)return null;const code=a.code||{};const tabs=Object.keys(code);const at=tabs.includes(ct)?ct:tabs[0];const papers=PAPERS[a.id]||[];return<div onClick={onClose} style={{position:"fixed",inset:0,zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(0,0,0,0.65)",backdropFilter:"blur(10px)",animation:"fadeIn 0.15s"}}><div onClick={e=>e.stopPropagation()} style={{background:"linear-gradient(160deg,#0C1222,#151D30)",border:"1px solid rgba(148,163,184,0.15)",borderRadius:14,padding:"24px",maxWidth:580,width:"94%",maxHeight:"90vh",overflowY:"auto",boxShadow:"0 30px 80px rgba(0,0,0,0.6)",animation:"scaleIn 0.2s"}}><div style={{display:"flex",justifyContent:"space-between",gap:12}}><div><span style={{fontSize:28}}>{a.icon}</span><h2 style={{color:"#F1F5F9",fontSize:18,margin:"4px 0 2px",fontFamily:"var(--fd)",fontWeight:700}}>{a.name}</h2><p style={{color:"#94A3B8",fontSize:12,margin:0,lineHeight:1.5}}>{a.desc}</p>{a.compute && <div style={{display:"flex",gap:8,marginTop:10}}><span style={{background:"rgba(34,211,238,0.1)",border:"1px solid rgba(34,211,238,0.2)",color:"#22D3EE",padding:"4px 8px",borderRadius:6,fontSize:9,fontWeight:700,fontFamily:"var(--fd)",letterSpacing:"0.5px"}}>COST: {a.compute.cost}</span><span style={{background:"rgba(167,139,250,0.1)",border:"1px solid rgba(167,139,250,0.2)",color:"#A78BFA",padding:"4px 8px",borderRadius:6,fontSize:9,fontWeight:700,fontFamily:"var(--fd)",letterSpacing:"0.5px"}}>HARDWARE: {a.compute.hardware}</span></div>}</div><button onClick={onClose} style={{background:"rgba(255,255,255,0.06)",border:"none",color:"#64748B",fontSize:16,cursor:"pointer",borderRadius:6,width:28,height:28,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>✕</button></div>
{a.ratings&&<div style={{marginTop:14,padding:"10px 12px",borderRadius:8,background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.04)"}}>{Object.entries(a.ratings).map(([k,v])=><div key={k} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"3px 0"}}><span style={{fontSize:11,color:"#94A3B8",fontFamily:"var(--fd)",width:120}}>{ML[k]}</span><RatingBar value={v} color={MC[k]}/></div>)}</div>}
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginTop:12}}><div><h4 style={{color:"#34D399",fontSize:10,marginBottom:6,fontFamily:"var(--fd)",letterSpacing:"0.5px"}}>✓ STRENGTHS</h4>{(a.pros||[]).map((p,i)=><div key={i} style={{color:"#CBD5E1",fontSize:11,padding:"2px 0 2px 10px",position:"relative",lineHeight:1.5}}><span style={{position:"absolute",left:0,color:"#34D399"}}>›</span>{p}</div>)}</div><div><h4 style={{color:"#F87171",fontSize:10,marginBottom:6,fontFamily:"var(--fd)",letterSpacing:"0.5px"}}>✗ LIMITATIONS</h4>{(a.cons||[]).map((c,i)=><div key={i} style={{color:"#CBD5E1",fontSize:11,padding:"2px 0 2px 10px",position:"relative",lineHeight:1.5}}><span style={{position:"absolute",left:0,color:"#F87171"}}>›</span>{c}</div>)}</div></div>
{/* Papers */}
{papers.length>0&&<div style={{marginTop:14}}><h4 style={{color:"#818CF8",fontSize:10,marginBottom:6,fontFamily:"var(--fd)",letterSpacing:"0.5px"}}>📄 KEY PAPERS</h4>{papers.map((p,i)=><a key={i} href={p.url} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()} style={{display:"block",padding:"6px 10px",marginBottom:4,borderRadius:6,background:"rgba(129,140,248,0.06)",border:"1px solid rgba(129,140,248,0.1)",textDecoration:"none",transition:"all 0.15s"}} onMouseEnter={e=>e.currentTarget.style.borderColor="rgba(129,140,248,0.3)"} onMouseLeave={e=>e.currentTarget.style.borderColor="rgba(129,140,248,0.1)"}><div style={{fontSize:12,color:"#C7D2FE",fontWeight:600,lineHeight:1.4}}>{p.title}</div><div style={{fontSize:10,color:"#64748B",marginTop:2}}>{p.authors} · {p.year} · {p.venue}</div></a>)}</div>}
{/* Code */}
{tabs.length>0&&<div style={{marginTop:14}}><div style={{display:"flex",gap:4,marginBottom:2}}>{tabs.map(t=><button key={t} onClick={e=>{e.stopPropagation();setCt(t)}} style={{padding:"4px 10px",borderRadius:4,border:"none",background:at===t?"rgba(34,211,238,0.12)":"transparent",color:at===t?"#22D3EE":"#475569",fontSize:10,cursor:"pointer",fontFamily:"var(--fd)",fontWeight:600}}>{t==="sklearn"?"Scikit-learn":t==="hf"?"Hugging Face":"PyTorch"}</button>)}</div><CodeBlock code={code[at]} label={at==="sklearn"?"SCIKIT-LEARN / PYTHON":at==="hf"?"HUGGING FACE / PYTHON":"PYTORCH"}/></div>}
{a.score!==undefined&&a.score>0&&<div style={{marginTop:14,padding:"8px 12px",borderRadius:6,background:"rgba(251,191,36,0.06)",border:"1px solid rgba(251,191,36,0.12)"}}><div style={{display:"flex",justifyContent:"space-between"}}><span style={{color:"#FBBF24",fontSize:11,fontWeight:700,fontFamily:"var(--fd)"}}>Match Score</span><span style={{color:"#FBBF24",fontSize:14,fontWeight:700,fontFamily:"var(--fd)"}}>{a.score}%</span></div><div style={{background:"#1E293B",borderRadius:3,height:4,marginTop:6,overflow:"hidden"}}><div style={{height:"100%",width:`${a.score}%`,background:"linear-gradient(90deg,#FBBF24,#F59E0B)",borderRadius:3}}/></div></div>}
</div></div>}

function UseCaseCard({useCase:u,industry:ind,index:i}){const[o,setO]=useState(false);return<div onClick={()=>setO(!o)} style={{padding:"14px 16px",borderRadius:10,cursor:"pointer",transition:"all 0.2s",background:o?ind.gradient:"rgba(255,255,255,0.02)",border:`1px solid ${o?ind.color+"40":"rgba(255,255,255,0.04)"}`,animation:`fadeSlide 0.3s ease ${i*0.05}s both`}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{display:"flex",alignItems:"center",gap:8}}><span style={{display:"inline-flex",alignItems:"center",justifyContent:"center",width:22,height:22,borderRadius:5,background:ind.color+"15",color:ind.color,fontSize:10,fontWeight:700,fontFamily:"var(--fd)"}}>{i+1}</span><h4 style={{margin:0,fontSize:13,fontWeight:600,color:"#F1F5F9",fontFamily:"var(--fd)"}}>{u.title}</h4></div><span style={{fontSize:9,color:ind.color,transform:o?"rotate(180deg)":"rotate(0)",transition:"transform 0.2s"}}>▼</span></div><p style={{margin:"4px 0 0 30px",fontSize:12,color:"#94A3B8",lineHeight:1.5}}>{u.desc}</p>{o&&<div style={{marginTop:12,marginLeft:30,animation:"fadeSlide 0.2s"}}><div style={{marginBottom:10}}><div style={{fontSize:9,color:ind.color,fontWeight:600,marginBottom:5,fontFamily:"var(--fd)",letterSpacing:"0.5px"}}>RECOMMENDED ALGORITHMS</div><div style={{display:"flex",flexWrap:"wrap",gap:4}}>{u.algorithms.map((a,j)=><span key={j} style={{padding:"2px 8px",borderRadius:99,background:ind.color+"12",color:ind.color,fontSize:10}}>{a}</span>)}</div></div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}><div style={{padding:"8px 12px",borderRadius:6,background:"rgba(0,0,0,0.25)"}}><div style={{fontSize:9,color:"#64748B",fontFamily:"var(--fd)",letterSpacing:"0.5px",marginBottom:2}}>IMPACT</div><div style={{fontSize:11,color:"#34D399",fontWeight:600}}>{u.impact}</div></div><div style={{padding:"8px 12px",borderRadius:6,background:"rgba(0,0,0,0.25)"}}><div style={{fontSize:9,color:"#64748B",fontFamily:"var(--fd)",letterSpacing:"0.5px",marginBottom:2}}>DATA</div><div style={{fontSize:11,color:"#CBD5E1",fontWeight:600}}>{u.dataType}</div></div></div></div>}</div>}

/* ── Compare ── */
function CompareView({allAlgos:all,onSelectAlgo:onS}){const[sel,setSel]=useState([]);const[s,setS]=useState("");const f=s?all.filter(a=>a.name.toLowerCase().includes(s.toLowerCase())):all;const tog=a=>{setSel(p=>p.find(x=>x.id===a.id)?p.filter(x=>x.id!==a.id):p.length<4?[...p,a]:p)};return<div style={{marginTop:8}}><h2 style={{fontSize:18,fontWeight:700,color:"#F1F5F9",fontFamily:"var(--fd)",marginBottom:4}}>Compare Algorithms</h2><p style={{color:"#475569",fontSize:12,marginBottom:16}}>Select 2–4 algorithms side by side</p><div style={{position:"relative",marginBottom:12}}><input type="text" value={s} onChange={e=>setS(e.target.value)} placeholder="Search to add..." style={{width:"100%",padding:"9px 14px 9px 34px",borderRadius:8,border:"1px solid rgba(255,255,255,0.06)",background:"rgba(255,255,255,0.03)",color:"#E2E8F0",fontSize:13,outline:"none",fontFamily:"var(--fb)"}}/><span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",fontSize:13,opacity:0.3}}>🔍</span></div>{sel.length>0&&<div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:12}}>{sel.map(a=><span key={a.id} onClick={()=>tog(a)} style={{padding:"4px 10px",borderRadius:99,background:"rgba(34,211,238,0.1)",border:"1px solid rgba(34,211,238,0.3)",color:"#22D3EE",fontSize:11,cursor:"pointer",fontFamily:"var(--fd)",display:"flex",alignItems:"center",gap:4}}>{a.icon} {a.name} <span style={{opacity:0.5}}>✕</span></span>)}</div>}{s&&<div style={{background:"rgba(12,18,34,0.95)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:8,maxHeight:200,overflowY:"auto",marginBottom:16}}>{f.map(a=>{const is=sel.find(x=>x.id===a.id);return<div key={a.id} onClick={()=>{tog(a);setS("")}} style={{padding:"8px 14px",cursor:"pointer",display:"flex",alignItems:"center",gap:8,borderBottom:"1px solid rgba(255,255,255,0.03)",background:is?"rgba(34,211,238,0.06)":"transparent"}} onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.04)"} onMouseLeave={e=>e.currentTarget.style.background=is?"rgba(34,211,238,0.06)":"transparent"}><span>{a.icon}</span><span style={{fontSize:12,color:"#E2E8F0",fontFamily:"var(--fd)"}}>{a.name}</span>{is&&<span style={{marginLeft:"auto",color:"#22D3EE",fontSize:10}}>✓</span>}</div>})}{f.length===0&&<div style={{padding:16,color:"#475569",fontSize:12,textAlign:"center"}}>No results</div>}</div>}{sel.length>=2&&<div style={{animation:"fadeSlide 0.3s",overflowX:"auto"}}><div style={{display:"grid",gridTemplateColumns:`140px repeat(${sel.length},1fr)`,gap:0,minWidth:sel.length>3?700:"auto"}}><div style={{padding:"12px 8px",borderBottom:"1px solid rgba(255,255,255,0.06)"}}/>{sel.map(a=><div key={a.id} onClick={()=>onS(a)} style={{padding:"12px 8px",borderBottom:"1px solid rgba(255,255,255,0.06)",textAlign:"center",cursor:"pointer"}}><div style={{fontSize:20,marginBottom:4}}>{a.icon}</div><div style={{fontSize:11,fontWeight:700,color:"#F1F5F9",fontFamily:"var(--fd)"}}>{a.name}</div></div>)}
{Object.entries(ML).flatMap(([k,l])=>[<div key={k+"l"} style={{padding:"10px 8px",borderBottom:"1px solid rgba(255,255,255,0.03)",fontSize:11,color:MC[k],fontFamily:"var(--fd)",display:"flex",alignItems:"center"}}>{l}</div>,...sel.map(a=><div key={k+a.id} style={{padding:"10px 8px",borderBottom:"1px solid rgba(255,255,255,0.03)",display:"flex",justifyContent:"center"}}><RatingBar value={a.ratings?.[k]||0} color={MC[k]}/></div>)])}
<div style={{padding:"10px 8px",fontSize:11,color:"#34D399",fontFamily:"var(--fd)",borderBottom:"1px solid rgba(255,255,255,0.03)"}}>Strengths</div>{sel.map(a=><div key={"p"+a.id} style={{padding:"10px 8px",borderBottom:"1px solid rgba(255,255,255,0.03)"}}>{(a.pros||[]).map((p,i)=><div key={i} style={{fontSize:10,color:"#CBD5E1",lineHeight:1.5}}>• {p}</div>)}</div>)}<div style={{padding:"10px 8px",fontSize:11,color:"#F87171",fontFamily:"var(--fd)"}}>Limitations</div>{sel.map(a=><div key={"c"+a.id} style={{padding:"10px 8px"}}>{(a.cons||[]).map((c,i)=><div key={i} style={{fontSize:10,color:"#CBD5E1",lineHeight:1.5}}>• {c}</div>)}</div>)}</div></div>}{sel.length<2&&<div style={{textAlign:"center",padding:"40px 20px",color:"#334155"}}><div style={{fontSize:36,marginBottom:8}}>⚖️</div><div style={{fontSize:13}}>Select at least 2 algorithms to compare</div></div>}</div>}

/* ── Trending ── */
function TrendingView(){const[filter,setFilter]=useState("All");const cats=["All",...new Set(TRENDING_DATA.map(t=>t.category))];const filtered=filter==="All"?TRENDING_DATA:TRENDING_DATA.filter(t=>t.category===filter);return<div style={{marginTop:8}}><h2 style={{fontSize:18,fontWeight:700,color:"#F1F5F9",fontFamily:"var(--fd)",marginBottom:4}}>What's Trending in ML</h2><p style={{color:"#475569",fontSize:12,marginBottom:16}}>Current trends shaping the ML landscape in 2025–2026</p><div style={{display:"flex",gap:4,overflowX:"auto",paddingBottom:8,marginBottom:16}}>{cats.map(c=><button key={c} onClick={()=>setFilter(c)} style={{padding:"6px 12px",borderRadius:6,border:`1px solid ${filter===c?"rgba(34,211,238,0.3)":"rgba(255,255,255,0.04)"}`,background:filter===c?"rgba(34,211,238,0.08)":"transparent",color:filter===c?"#22D3EE":"#475569",cursor:"pointer",fontSize:11,fontWeight:600,fontFamily:"var(--fd)",whiteSpace:"nowrap"}}>{c}</button>)}</div><div style={{display:"flex",flexDirection:"column",gap:8}}>{filtered.map((t,i)=><TrendCard key={t.id} trend={t} index={i}/>)}</div></div>}

function TrendCard({trend:t,index:i}){const[o,setO]=useState(false);const hc=HEAT_COLORS[t.heat];return<div onClick={()=>setO(!o)} style={{padding:"16px 18px",borderRadius:10,cursor:"pointer",transition:"all 0.2s",background:o?`linear-gradient(135deg, ${hc}08, ${hc}04)`:"rgba(255,255,255,0.02)",border:`1px solid ${o?hc+"35":"rgba(255,255,255,0.04)"}`,animation:`fadeSlide 0.3s ease ${i*0.05}s both`}} onMouseEnter={e=>{if(!o)e.currentTarget.style.borderColor=hc+"20"}} onMouseLeave={e=>{if(!o)e.currentTarget.style.borderColor=o?hc+"35":"rgba(255,255,255,0.04)"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:10}}><div style={{flex:1}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}><span style={{fontSize:20}}>{t.icon}</span><span style={{fontSize:10,padding:"2px 8px",borderRadius:99,background:hc+"15",color:hc,fontWeight:600,fontFamily:"var(--fd)"}}>{HEAT_LABELS[t.heat]}</span><span style={{fontSize:10,color:"#475569",fontFamily:"var(--fd)"}}>{t.category}</span></div><h3 style={{margin:0,fontSize:14,fontWeight:700,color:"#F1F5F9",fontFamily:"var(--fd)",lineHeight:1.4}}>{t.title}</h3><p style={{margin:"6px 0 0",fontSize:12,color:"#94A3B8",lineHeight:1.6}}>{t.desc}</p></div></div>{o&&<div style={{marginTop:12,animation:"fadeSlide 0.2s"}}><div style={{marginBottom:10}}><div style={{fontSize:9,color:"#64748B",fontWeight:600,marginBottom:5,fontFamily:"var(--fd)",letterSpacing:"0.5px"}}>RELATED ALGORITHMS</div><div style={{display:"flex",flexWrap:"wrap",gap:4}}>{t.tags.map((tag,j)=><span key={j} style={{padding:"2px 8px",borderRadius:99,background:hc+"10",color:hc,fontSize:10}}>{tag}</span>)}</div></div><div style={{padding:"8px 12px",borderRadius:6,background:"rgba(0,0,0,0.2)"}}><div style={{fontSize:9,color:"#64748B",fontFamily:"var(--fd)",letterSpacing:"0.5px",marginBottom:2}}>SOURCE ARTICLE</div><a href={t.url} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()} style={{fontSize:11,color:"#38BDF8",textDecoration:"none",display:"inline-block",padding:"2px 0",borderBottom:"1px solid transparent",transition:"border 0.2s"}} onMouseEnter={e=>e.currentTarget.style.borderBottom="1px solid #38BDF8"} onMouseLeave={e=>e.currentTarget.style.borderBottom="1px solid transparent"}>{t.source} ↗</a></div></div>}</div>}

/* ═══════════════════════════════════ MAIN APP ═══════════════════════════════════ */
export default function App(){
  const[view,setView]=useState("tree");const[ex,setEx]=useState({root:true});const[sel,setSel]=useState(null);const[cq,setCq]=useState(0);const[ans,setAns]=useState({});const[res,setRes]=useState([]);const[sq,setSq]=useState("");const[ai,setAi]=useState(INDUSTRIES[0].id);
  const[shareText,setShareText]=useState("🔗 Share My Stack");
  const all=getAllLeaves(ML_TREE);const te=useCallback(id=>setEx(p=>({...p,[id]:!p[id]})),[]);
  const ea=()=>{const ids={};(function w(n){ids[n.id]=true;n.children?.forEach(w)})(ML_TREE);setEx(ids)};const ca=()=>setEx({root:true});
  const ha=(qId,v)=>{const a={...ans,[qId]:v};setAns(a);if(cq<QUESTIONS.length-1)setTimeout(()=>setCq(cq+1),150);else{setRes(scoreAlgos(a));setTimeout(()=>setView("results"),200)}};
  const rw=()=>{setCq(0);setAns({});setRes([]);setView("wizard")};
  
  const handleShare = () => {
    if (!res || res.length === 0) return;
    const topAlgo = res[0];
    const taskStr = (ans.task || "ML").replace(/_/g, " ");
    const text = `🎯 Just mapped my architecture for a ${taskStr} task. Top pick: **${topAlgo.name}** (${topAlgo.score}% match) ${topAlgo.icon}. Find your ideal ML stack at ML Algorithm Navigator!`;
    navigator.clipboard.writeText(text);
    setShareText("✓ Copied to Clipboard!");
    setTimeout(() => setShareText("🔗 Share My Stack"), 2500);
  };

  function ft(n,q){if(!q)return n;const l=q.toLowerCase();if(n.name.toLowerCase().includes(l)||(n.desc||"").toLowerCase().includes(l))return n;if(n.children){const f=n.children.map(c=>ft(c,q)).filter(Boolean);if(f.length)return{...n,children:f}}return null}
  const fTree=ft(ML_TREE,sq)||{...ML_TREE,children:[]};
  useEffect(()=>{if(sq)ea()},[sq]);
  const ci=INDUSTRIES.find(x=>x.id===ai);
  
  // Reordered tabs to put "Use Cases" immediately after "Algorithm Tree"
  const tabs=[{id:"tree",label:"Algorithm Tree",icon:"🌳"},{id:"usecases",label:"Use Cases",icon:"🏢"},{id:"compare",label:"Compare",icon:"⚖️"},{id:"trending",label:"Trending",icon:"🔥"},{id:"wizard",label:"Wizard",icon:"🧙"}];

  return<div style={{minHeight:"100vh",background:"#060B14",color:"#E2E8F0",fontFamily:"var(--fb)"}}>
    <style>{`@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Outfit:wght@400;500;600;700&display=swap');:root{--fd:'JetBrains Mono',monospace;--fb:'Outfit',sans-serif}@keyframes fadeSlide{from{opacity:0;transform:translateY(-5px)}to{opacity:1;transform:translateY(0)}}@keyframes fadeIn{from{opacity:0}to{opacity:1}}@keyframes scaleIn{from{opacity:0;transform:scale(0.96)}to{opacity:1;transform:scale(1)}}*{box-sizing:border-box;margin:0}::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:#1E293B;border-radius:3px}body{margin:0;background:#060B14}`}</style>
    
    <header style={{padding:"20px 24px 0",maxWidth:900,margin:"0 auto"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
        <div>
          <h1 style={{fontSize:22,fontFamily:"var(--fd)",fontWeight:700,background:"linear-gradient(135deg,#22D3EE,#A78BFA,#F472B6)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",margin:0}}>ML Algorithm Navigator</h1>
          <p style={{color:"#475569",fontSize:12,marginTop:2,marginBottom:0}}>Explore, compare, and find the right model for your use case</p>
        </div>
        <a href="https://github.com/Ganesh-WeekendBuilds/ml-algorithm-navigator" target="_blank" rel="noopener noreferrer" style={{padding:"8px 14px",borderRadius:8,background:"rgba(34,211,238,0.1)",border:"1px solid rgba(34,211,238,0.3)",color:"#22D3EE",fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"var(--fd)",display:"flex",alignItems:"center",gap:6,transition:"all 0.2s",textDecoration:"none"}} onMouseEnter={e=>e.currentTarget.style.background="rgba(34,211,238,0.2)"} onMouseLeave={e=>e.currentTarget.style.background="rgba(34,211,238,0.1)"}><span>⭐</span> Star on GitHub</a>
      </div>
      <div style={{display:"flex",gap:2,background:"rgba(255,255,255,0.03)",borderRadius:10,padding:3,border:"1px solid rgba(255,255,255,0.05)",overflowX:"auto"}}>{tabs.map(t=>{const a=view===t.id||(t.id==="wizard"&&view==="results");return<button key={t.id} onClick={()=>t.id==="wizard"?rw():setView(t.id)} style={{flex:1,padding:"9px 6px",borderRadius:8,border:"none",background:a?"rgba(255,255,255,0.07)":"transparent",color:a?"#F1F5F9":"#475569",cursor:"pointer",fontSize:10,fontWeight:600,fontFamily:"var(--fd)",transition:"all 0.2s",display:"flex",alignItems:"center",justifyContent:"center",gap:4,whiteSpace:"nowrap",minWidth:0}}><span style={{fontSize:12}}>{t.icon}</span><span>{t.label}</span></button>})}</div>
    </header>

    <main style={{maxWidth:900,margin:"0 auto",padding:"20px 24px 60px"}}>
    {view==="tree"&&<div><div style={{display:"flex",gap:6,marginBottom:14}}><div style={{flex:1,position:"relative"}}><input type="text" value={sq} onChange={e=>setSq(e.target.value)} placeholder="Search algorithms..." style={{width:"100%",padding:"9px 14px 9px 34px",borderRadius:8,border:"1px solid rgba(255,255,255,0.06)",background:"rgba(255,255,255,0.03)",color:"#E2E8F0",fontSize:13,outline:"none",fontFamily:"var(--fb)"}}/><span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",fontSize:13,opacity:0.3}}>🔍</span></div><button onClick={ea} style={{padding:"9px 12px",borderRadius:8,border:"1px solid rgba(255,255,255,0.06)",background:"transparent",color:"#64748B",cursor:"pointer",fontSize:11,fontFamily:"var(--fd)"}}>Expand</button><button onClick={ca} style={{padding:"9px 12px",borderRadius:8,border:"1px solid rgba(255,255,255,0.06)",background:"transparent",color:"#64748B",cursor:"pointer",fontSize:11,fontFamily:"var(--fd)"}}>Collapse</button></div><TreeNode node={fTree} onSelect={setSel} expanded={ex} toggleExpand={te}/></div>}
    {view==="compare"&&<CompareView allAlgos={all} onSelectAlgo={setSel}/>}
    {view==="trending"&&<TrendingView/>}
    {view==="wizard"&&<div style={{maxWidth:560,margin:"20px auto 0"}}><div style={{display:"flex",gap:4,marginBottom:28}}>{QUESTIONS.map((_,i)=><div key={i} style={{flex:1,height:3,borderRadius:2,background:i<=cq?"#22D3EE":"rgba(255,255,255,0.05)"}}/>)}</div><div style={{fontSize:11,color:"#475569",marginBottom:6,fontFamily:"var(--fd)"}}>STEP {cq+1} / {QUESTIONS.length}</div><h2 style={{fontSize:20,fontWeight:700,color:"#F1F5F9",marginBottom:20,fontFamily:"var(--fd)"}}>{QUESTIONS[cq].question}</h2><div style={{display:"flex",flexDirection:"column",gap:6}}>{QUESTIONS[cq].options.map(o=>{const s=ans[QUESTIONS[cq].id]===o.value;return<button key={o.value} onClick={()=>ha(QUESTIONS[cq].id,o.value)} style={{display:"flex",alignItems:"center",gap:10,padding:"12px 16px",borderRadius:8,border:s?"1px solid #22D3EE40":"1px solid rgba(255,255,255,0.04)",background:s?"rgba(34,211,238,0.06)":"rgba(255,255,255,0.02)",color:"#E2E8F0",cursor:"pointer",fontSize:13,textAlign:"left",fontFamily:"var(--fb)"}}><span style={{fontSize:18}}>{o.icon}</span>{o.label}</button>})}</div>{cq>0&&<button onClick={()=>setCq(cq-1)} style={{marginTop:16,padding:"7px 14px",borderRadius:6,border:"1px solid rgba(255,255,255,0.06)",background:"transparent",color:"#64748B",cursor:"pointer",fontSize:12,fontFamily:"var(--fd)"}}>← Back</button>}</div>}
    {view==="results"&&<div><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,marginTop:8}}><div><h2 style={{fontSize:18,fontWeight:700,color:"#F1F5F9",fontFamily:"var(--fd)"}}>Recommended Algorithms</h2></div><div><button onClick={handleShare} style={{padding:"7px 14px",borderRadius:6,border:"1px solid rgba(167,139,250,0.4)",background:"rgba(167,139,250,0.1)",color:"#A78BFA",cursor:"pointer",fontSize:12,fontFamily:"var(--fd)",marginRight:8,fontWeight:"bold",transition:"all 0.2s"}}>{shareText}</button><button onClick={rw} style={{padding:"7px 14px",borderRadius:6,border:"1px solid rgba(255,255,255,0.06)",background:"transparent",color:"#64748B",cursor:"pointer",fontSize:12,fontFamily:"var(--fd)"}}>↻ Redo</button></div></div><div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:16}}>{Object.values(ans).map((v,i)=><span key={i} style={{padding:"3px 9px",borderRadius:99,background:"rgba(34,211,238,0.08)",color:"#22D3EE",fontSize:10,fontFamily:"var(--fd)"}}>{v.replace(/_/g," ")}</span>)}</div><div style={{display:"flex",flexDirection:"column",gap:6}}>{res.map((a,i)=><div key={a.id} onClick={()=>setSel(a)} style={{padding:"14px 16px",borderRadius:10,cursor:"pointer",background:i===0?"linear-gradient(135deg,rgba(251,191,36,0.05),rgba(34,211,238,0.05))":"rgba(255,255,255,0.02)",border:i===0?"1px solid rgba(251,191,36,0.2)":"1px solid rgba(255,255,255,0.04)",animation:`fadeSlide 0.3s ease ${i*0.05}s both`}}>{i===0&&<div style={{fontSize:9,color:"#FBBF24",fontWeight:700,fontFamily:"var(--fd)",marginBottom:4}}>★ TOP PICK</div>}<div style={{display:"flex",alignItems:"center",gap:10}}><span style={{fontSize:22}}>{a.icon}</span><div style={{flex:1}}><div style={{fontSize:14,fontWeight:700,color:"#F1F5F9",fontFamily:"var(--fd)"}}>{a.name}</div><div style={{fontSize:11,color:"#64748B",marginTop:1}}>{a.desc}</div></div><div style={{fontSize:18,fontWeight:700,color:a.score>=75?"#34D399":a.score>=50?"#FBBF24":"#64748B",fontFamily:"var(--fd)"}}>{a.score}%</div></div></div>)}</div></div>}
    {view==="usecases"&&<div style={{marginTop:8}}><div style={{display:"flex",gap:4,overflowX:"auto",paddingBottom:8,marginBottom:16}}>{INDUSTRIES.map(ind=>{const a=ai===ind.id;return<button key={ind.id} onClick={()=>setAi(ind.id)} style={{padding:"8px 14px",borderRadius:8,border:`1px solid ${a?ind.color+"40":"rgba(255,255,255,0.04)"}`,background:a?ind.gradient:"transparent",color:a?ind.color:"#475569",cursor:"pointer",fontSize:11,fontWeight:600,fontFamily:"var(--fd)",whiteSpace:"nowrap",display:"flex",alignItems:"center",gap:5,flexShrink:0}}><span style={{fontSize:14}}>{ind.icon}</span>{ind.name}</button>})}</div>{ci&&<div key={ci.id} style={{animation:"fadeSlide 0.25s"}}><div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}><span style={{fontSize:28}}>{ci.icon}</span><div><h2 style={{fontSize:18,fontWeight:700,color:"#F1F5F9",fontFamily:"var(--fd)",margin:0}}>{ci.name}</h2><p style={{color:"#475569",fontSize:12,margin:"2px 0 0"}}>Top 5 ML use cases</p></div></div><div style={{display:"flex",flexDirection:"column",gap:6}}>{ci.useCases.map((uc,i)=><UseCaseCard key={uc.title} useCase={uc} industry={ci} index={i}/>)}</div></div>}</div>}
    </main>

    <DetailModal algo={sel} onClose={()=>setSel(null)}/>
  </div>
}